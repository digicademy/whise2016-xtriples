var instance = greuler({
  target: '#correspsearch-model',
  width: 800,
  height: 500,
  directed: true,
  avoidOverlaps: true,
  data: {
    nodes: [
      {id: 1, x: 100, y: 430, r: 45, fixed: true, label: 'Goethe', topRightLabel: 'foaf:Person'}
    ],
    links: []
  }
}).update();

$(function() {
    $("#step1").click(function() {
        if ($(".current").length < 1) {
            instance.graph.addNode({id: 2, x: 350, y: 430, r: 45, fixed: true, fill: '#F44336', label: 'Letter', topRightLabel: 'owltime:TemporalEntity'});
            instance.graph.addEdge({source: 1, target: 2, weight: 'cd:sending'});
            instance.update();
            $(this).addClass('current');
        }
    });
    $("#step2").click(function() {
        var current = $(".current").length;
        if (current > 0 && current < 2) {
            instance.graph.addNode({id: 11, x: 350, y: 50, r: 30, fixed: true, fill: '#F44336', label: '1793'});
            instance.graph.addEdge({source: 2, target: 11, weight: 'owltime:xsdDateTime'});
            instance.update();
            $(this).addClass('current');
        }
    });
    $("#step3").click(function() {
        var current = $(".current").length;
        if (current > 1 && current < 3) {
            instance.graph.addNode({id: 3, x: 600, y: 430, r: 45, fixed: true, label: 'Soemmering', topRightLabel: 'foaf:Person'});
            instance.graph.addEdge({source: 2, target: 3, weight: 'cd:receiving'});
            instance.update();
            $(this).addClass('current');
        }
    });
    $("#step4").click(function() {
        var current = $(".current").length;
        if (current > 2 && current < 4) {
            instance.graph.addNode({id: 4, x: 100, y: 180, r: 45, fixed: true, fill: '#4CAF50', label: 'Weimar', topRightLabel: 'place:City, geo:SpatialThing'});
            instance.graph.addEdge({source: 2, target: 4, weight: 'cd:sentFrom'});
            instance.graph.addNode({id: 5, x: 600, y: 180, r: 45, fixed: true, fill: '#4CAF50', label: 'Mainz', topRightLabel: 'place:City, geo:SpatialThing'});
            instance.graph.addEdge({source: 2, target: 5, weight: 'cd:sentTo'});
            instance.update();
            $(this).addClass('current');
        }
    });
    $("#step5").click(function() {
        var current = $(".current").length;
        if (current > 3 && current < 5) {
            instance.graph.addNode({id: 6, x: 50, y: 50, r: 30, fixed: true, fill: '#4CAF50', label: '50.98'});
            instance.graph.addEdge({source: 4, target: 6, weight: 'geo:lat'});
            instance.graph.addNode({id: 7, x: 150, y: 50, r: 30, fixed: true, fill: '#4CAF50', label: '11.32'});
            instance.graph.addEdge({source: 4, target: 7, weight: 'geo:long'});
            instance.graph.addNode({id: 8, x: 550, y: 50, r: 30, fixed: true, fill: '#4CAF50', label: '49.96'});
            instance.graph.addEdge({source: 5, target: 8, weight: 'geo:lat'});
            instance.graph.addNode({id: 9, x: 650, y: 50, r: 30, fixed: true, fill: '#4CAF50', label: '8.24'});
            instance.graph.addEdge({source: 5, target: 9, weight: 'geo:long'});
            instance.update();
            $(this).addClass('current');
        }
    });
    $("#step6").click(function() {
        var current = $(".current").length;
        if (current > 4 && current < 6) {
            var node = instance.graph.nodes[1];
            var update = instance.graph.getNode({ id: node.id });
            update.y = 290;
            instance.graph.addNode({id: 10, x: 350, y: 430, r: 50, fixed: true, label: 'Scientist', topRightLabel: 'gndo:SubjectHeading'});
            instance.graph.addEdge({source: 1, target: 10, weight: 'gndo:profession'});
            instance.graph.addEdge({source: 3, target: 10, weight: 'gndo:profession'});
            instance.update();
            $(this).addClass('current');
        }
    });
    $("#step7").click(function() {
        var current = $(".current").length;
        if (current > 5 && current < 7) {
            var path = [
                {source: 1, target: 2},
                {source: 2, target: 11},
                {source: 2, target: 4}
            ]
            var player = new greuler.player.Generator(instance);
            player.run(function *algorithm(instance) {
                for (var i = 0; i < 3; i += 1) {
                    yield function () {
                        instance.selector.traverseAllEdgesBetween({ 
                            source: path[i].source, target: path[i].target
                        });
                    };
                };
                yield function () {
                    instance.graph.addEdge({source: 1, target: 4, weight: 'was 1793 in', stroke: '#E74C3C'});
                    instance.update();
                };
                yield function () {
                    var edge = instance.graph.edges[11];
                    instance.selector.getEdge({ id: edge.id }).attr('stroke-dasharray', '5,5');
                };
            });
            $(this).addClass('current');
        }
    });
});
