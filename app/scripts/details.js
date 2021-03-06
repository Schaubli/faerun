(function () {
  // Globals
  let lore = null;
  let smilesDrawer = null;
  let smilesDrawerBig = null;
  let coords = [];
  let smilesData = [];
  let idsData = [];
  let databaseLinks = {};
  let schemblIdToId = {};
  let idToSchemblId = {};
  let center = null;
  let projections = [];
  let treeWorker = new Worker('libs/kmst/kmst-worker.js');
  let socketWorker = new Worker('scripts/socketWorker.js');
  let params = Faerun.parseUrlParams();
  let binColor = params.hue ? parseFloat(params.hue, 10) : 0.8;
  let csv = '';
  let viewAllInitialized = false;
  let selected = null;

  let bindings = Faerun.getBindings();

  // Events
  bindings.largePreview.addEventListener('change', function() {
    Faerun.largePreview = !Faerun.largePreview;

    if (Faerun.largePreview) {
      Faerun.show(bindings.overlayStructureContainer);
    } else {
      Faerun.hide(bindings.overlayStructureContainer);
    }
  });

  bindings.switchColor.addEventListener('change', function () {
    if (bindings.switchColor.checked) {
      lore.setClearColor(Lore.Core.Color.fromHex('#ffffff'));
      treeHelper.setFog([1.0, 1.0, 1.0, 1.0], 8.0);
      for (var i = 0; i < projections.length; i++) {
        projections[i].pointHelper.setFog([1.0, 1.0, 1.0, 1.0], 8.0);
      }
      
    } else {
      lore.setClearColor(Lore.Core.Color.fromHex('#121212'));
      treeHelper.setFog([0.05, 0.05, 0.05, 1.0], 8.0);
      for (var i = 0; i < projections.length; i++) {
        projections[i].pointHelper.setFog([0.05, 0.05, 0.05, 1.0], 8.0);
      }
    }
  }, false);

  $('#download-csv').click(function () {
    let blob = new Blob([csv], {
      type: 'text/plain;charset=utf-8'
    });

    saveAs(blob, 'faerun_export_' + params.variantId + '.csv');
  });

  $('#button-all-compounds').click(function () {
    if (!viewAllInitialized) {
      setTimeout(function () {
        for (var i = 0; i < smilesData.length; i++) {
          let smiles = smilesData[i];
          let id = idsData[i];
          let compoundWrapper = document.createElement('div');
          let compoundInfo = document.createElement('div');
          let canvas = document.createElement('canvas');
          let container = $('#compounds-container');

          compoundWrapper.classList.add('compound-wrapper');
          compoundInfo.classList.add('compound-info');
          compoundInfo.setAttribute('data-schemblid', idToSchemblId[i] || id);
          canvas.setAttribute('id', 'canvas-' + i);
          compoundWrapper.appendChild(canvas);
          compoundWrapper.appendChild(compoundInfo);
          container.append(compoundWrapper);

          Faerun.hover(compoundInfo, function () {
            $(compoundInfo).empty();

            let schemblId = compoundInfo.getAttribute('data-schemblid');
            let databases = databaseLinks[schemblId];

            compoundInfo.innerHTML += '<p>' + schemblId || id + '</p>';

            if (databases) {
              for (var i = 0; i < databases.length; i++) {
                let database = databases[i];
                let a = document.createElement('a');

                a.innerHTML = database.name;
                a.setAttribute('href', database.url);

                compoundInfo.appendChild(a);
              }
            } else if (id.toLowerCase().indexOf('chembl') > -1) {
              let a = document.createElement('a');
              let database = FaerunConfig.chembl.sources['1'];

              a.innerHTML = database.name_label;
              a.setAttribute('href', database.base_id_url + id);

              compoundInfo.appendChild(a);
            } else {
              compoundInfo.innerHTML = 'Could not load remote info for ' + schemblId;
            }

            compoundInfo.classList.add('visible');
          }, function () {
            compoundInfo.classList.remove('visible');
          });

          SmilesDrawer.parse(smiles, function (tree) {
            smilesDrawerBig.draw(tree, 'canvas-' + i, 'light');
          });
        }
      }, 1000);
    }

    viewAllInitialized = true;
  });

  bindings.buttonRecenter.addEventListener('click', function () {
    lore.controls.setLookAt(center);
  });

  bindings.buttonZoomIn.addEventListener('click', function () {
    lore.controls.zoomIn();
  });

  bindings.buttonZoomOut.addEventListener('click', function () {
    lore.controls.zoomOut();
  });

  bindings.buttonToggleSelect.addEventListener('click', function () {
    Faerun.toggleClass(bindings.buttonToggleSelect, 'mdl-button--colored');
    if (lore.controls.touchMode === 'drag') {
      Faerun.showMobile(bindings.hoverStructure);
      lore.controls.touchMode = 'select';
    } else {
      Faerun.hideMobile(bindings.hoverStructure);
      lore.controls.touchMode = 'drag';
    }
  });

  bindings.buttonSelectHovered.addEventListener('click', function () {
    projections[0].octreeHelper.selectHovered();
  });

  // Socket.IO communication
  document.addEventListener('DOMContentLoaded', function (event) {
    Faerun.initFullscreenSwitch(bindings.switchFullscreen);
    smilesDrawer = new SmilesDrawer.Drawer({
      width: 180,
      height: 180,
      bondThickness: 1.5
    });

    smilesDrawerBig = new SmilesDrawer.Drawer({
      width: 250,
      height: 250,
      bondThickness: 1.5
    });


    // Show the loader from the beginning until everything is loaded
    bindings.loadingMessage.innerHTML = 'Loading geometry ...';
    Faerun.show(bindings.loader);

    treeWorker.onmessage = function (e) {
      treeHelper = new Lore.Helpers.TreeHelper(lore, 'TreeGeometry', 'tree');
      var x = new Array(e.data.length * 2);
      var y = new Array(e.data.length * 2);
      var z = new Array(e.data.length * 2);

      for (var i = 0; i < e.data.length; i++) {
        var a = e.data[i][0];
        var b = e.data[i][1];

        x.push(coords.x[a]);
        y.push(coords.y[a]);
        z.push(coords.z[a]);

        x.push(coords.x[b]);
        y.push(coords.y[b]);
        z.push(coords.z[b]);
      }

      treeHelper.setXYZHS(x, y, z, binColor, 1.0);
      treeHelper.setFog([0.05, 0.05, 0.05, 1.0], 8.0);
    };

    socketWorker.onmessage = function (e) {
      var cmd = e.data.cmd;
      var message = e.data.msg;

      if (cmd === 'init') {
        onInit(message);
      } else if (cmd === 'load:bin') {
        onBinLoaded(message);
      }
    };
  });

  /**
   * Initialize the configuration and load the bin data on init.
   *
   * @param {any} message - The server message containing the init information
   */
  function onInit(message) {
    socketWorker.postMessage({
      cmd: 'load:bin',
      msg: {
        databaseId: params.databaseId,
        fingerprintId: params.fingerprintId,
        variantId: params.variantId,
        binIndex: params.binIndex
      }
    });
  }

  /**
   * Initialize the 3d map as well as the compound cards.
   *
   * @param {any} message - The server message containing the bin data
   */
  function onBinLoaded(message) {
    coords = Faerun.getCoords(message.coordinates, 250);
    smilesData = message.smiles;
    idsData = message.ids;

    // Create the csv
    csv = 'binIndex;id;smiles;x;y;z\n';

    for (var i = 0; i < message.smiles.length; i++) {
      let xyz = message.coordinates[i].split(',');

      csv += message.binIndices[i] + ';' + message.ids[i] + ';' +
        message.smiles[i] + ';' + xyz[0] + ';' + xyz[1] + ';' + xyz[2] + '\n';
    }

    csv = csv.substring(0, csv.length);

    lore = Lore.init('lore', {
      clearColor: '#121212',
      limitRotationToHorizon: true,
      antialiasing: true
    });

    Faerun.initViewSelect(bindings.selectView, lore);

    // Setup the coordinate system
    var cs = Faerun.updateCoordinatesHelper(lore, coords.scale, 0, true, false);

    // Add a bit of randomness to the coords to resolve overlaps
    for (var i = 0; i < coords.x.length; i++) {
      coords.x[i] += (Math.random() - 0.5) * 10;
      coords.y[i] += (Math.random() - 0.5) * 10;
      coords.z[i] += (Math.random() - 0.5) * 10;
    }

    // The tree
    var tmpArr = [];

    for (var i = 0; i < coords.x.length; i++) {
      tmpArr.push([coords.x[i], coords.y[i], coords.z[i]]);
    }

    treeWorker.postMessage(tmpArr);

    let pointHelper = new Lore.Helpers.PointHelper(lore, 'TestGeometry', 'sphere', {
      pointScale: 10
    });

    let r = [];
    let g = [];
    let b = [];

    let firstBinIndex = parseInt(params.binIndex.split(',')[0], 10);
    for (var i = 0; i < coords.x.length; i++) {
      let rgb = [0, 0, 0];
      if (message.binIndices[i] === firstBinIndex) {
        rgb = Lore.Core.Color.hslToRgb(binColor, 1.0, 0.5);
      } else {
        rgb = Lore.Core.Color.hslToRgb(binColor, 0.25, 0.5);
      }

      r.push(rgb[0]);
      g.push(rgb[1]);
      b.push(rgb[2]);
    }

    pointHelper.setFog([0.05, 0.05, 0.05, 1.0], 8.0);
    pointHelper.setXYZRGBS(coords.x, coords.y, coords.z, r, g, b, 1.0);

    let octreeHelper = new Lore.Helpers.OctreeHelper(lore, 'OctreeGeometry', 'defaultSquare', pointHelper, {multiSelect: false});

    octreeHelper.addEventListener('hoveredchanged', function (e) {
      if (!e.e) {
        Faerun.hide(bindings.hoverIndicator);

        if (selected) {
          updatePanel(selected.index);
        }

        return;
      }

      updateHovered();
    });

    octreeHelper.addEventListener('selectedchanged', function (e) {
      if (!e.e) {
        Faerun.hide(bindings.hoverIndicator);
        return;
      }

      selected = e.e[0];

      updateSelected();
    });

    octreeHelper.addEventListener('updated', function () {
      if (octreeHelper.hovered) {
        updateHovered();
      }

      if (selected) {
        updateSelected();
      }
    });

    projections.push({
      name: 'main',
      color: '#fff',
      pointHelper: pointHelper,
      octreeHelper: octreeHelper
    });

    bindings.loadingMessage.innerHTML = 'Loading remote info ...';

    // If we use schembl ids, load this, else don't

    if (idsData[0].trim().split('_')[0].indexOf('schembl') > -1) {
      initMoleculeList();
    } else {
      Faerun.hide(bindings.loader);
    }
  }

  /**
   * Initializes the list of molecules.
   */
  function initMoleculeList() {
    let length = smilesData.length;

    for (var i = 0; i < smilesData.length; i++) {
      let schemblIds = idsData[i].trim();

      // Only take the first one for now
      let schemblId = schemblIds.split('_')[0];

      // If the id is not a schembl id
      if (schemblId.toLowerCase().indexOf('schembl') === -1) {
        continue;
      }

      schemblIdToId[schemblId] = i;
      idToSchemblId[i] = schemblId;

      $.ajax({
        url: Faerun.schemblIdsUrl(schemblId),
        jsonp: 'callback',
        dataType: 'jsonp',
        data: {},
        success: function (response) {
          // Recover schembl id
          let id = '';

          for (var k = 0; k < response.length; k++) {
            if (parseInt(response[k].src_id, 10) === 15) {
              id = response[k].src_compound_id;
              break;
            }
          }

          let items = [];

          for (var k = 0; k < response.length; k++) {
            let srcId = response[k].src_id;
            let srcInfo = FaerunConfig.schembl.sources[srcId];

            if(!srcInfo) {
              continue;
            }

            items.push({
              id: response[k].src_compound_id,
              name: srcInfo.name_label,
              url: srcInfo.base_id_url + response[k].src_compound_id
            });
          }

          databaseLinks[id] = items;
        },
        complete: function () {
          if (--length === 0) {
            // Hide loader here, since this is the closest to fully
            // loaded we get :-)
            Faerun.hide(bindings.loader);
          }
        }
      });
    }
  }

  /**
   * Update all HTML elements representing selected bins.
   */
  function updateSelected() {
    let pointSize = projections[0].pointHelper.getPointSize();
    let screenPosition = projections[0].octreeHelper.getScreenPosition(selected.index);

    Faerun.positionIndicator(bindings.selectIndicator, pointSize, screenPosition[0], screenPosition[1]);

    Faerun.show(bindings.selectIndicator);
  }

  /**
   * Update the hover indicators.
   */
  function updateHovered(layer) {
    layer = layer || 0;
    Faerun.show(bindings.hoverIndicator);
    let pointSize = projections[layer].pointHelper.getPointSize();
    Faerun.positionIndicator(bindings.hoverIndicator, pointSize, projections[layer].octreeHelper.hovered.screenPosition[0],
      projections[layer].octreeHelper.hovered.screenPosition[1]);

    let index = projections[layer].octreeHelper.hovered.index;

    updatePanel(index);
  }

  function updatePanel(index) {
    let smiles = smilesData[index];
    let id = idsData[index];

    SmilesDrawer.parse(smiles, function (tree) {
      smilesDrawer.draw(tree, 'hover-structure-drawing', 'dark');
    });

    // If enabled, draw overlay structure
    if (Faerun.largePreview) {
      let smilesDrawerOverlay = new SmilesDrawer.Drawer({
        width: $(bindings.overlayStructureContainer).width(),
        height: $(bindings.overlayStructureContainer).height()
      });

      SmilesDrawer.parse(smiles, function(tree) {
        smilesDrawerOverlay.draw(tree, 'overlay-structure', 'dark');
      });
    }

    bindings.infoSmiles.innerHTML = smiles;

    $(bindings.infoDatabases).empty();

    if (idToSchemblId.length > index) {
      let schemblId = idToSchemblId[index];
      let databases = databaseLinks[schemblId];

      if (databases) {
        for (var i = 0; i < databases.length; i++) {
          let database = databases[i];
          let a = document.createElement('a');

          a.innerHTML = database.name;
          a.setAttribute('href', database.url);

          bindings.infoDatabases.appendChild(a);
        }
      } else {
        let info = document.createElement('p');

        info.classList.add('info');
        info.innerHTML = 'Could not load remote info for ' + schemblId;
      }
    } else if (id.toLowerCase().indexOf('chembl') !== -1) {
      let a = document.createElement('a');
      let database = FaerunConfig.chembl.sources['1'];

      a.innerHTML = database.name_label;
      a.setAttribute('href', database.base_id_url + id);

      bindings.infoDatabases.appendChild(a);
    }
  }
})();
