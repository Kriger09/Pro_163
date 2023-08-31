AFRAME.registerComponent("wire-fence", {
    init: function () {
        var posX = -20
        var posZ = 85
        var posY = 2.5
        for (var i = 0; i < 3; i++) {
            var wire1 = document.createElement("a-entity")
            var wire2 = document.createElement("a-entity")
            var wire3 = document.createElement("a-entity")
            var wire4 = document.createElement("a-entity")
            posX += 5
            posZ -= 10
            var scale = { x: 2, y: 2, z: 2 }
            wire1.setAttribute("id", "wire1" + i)
            wire1.setAttribute("position", { x: posX, y: posY, z: -35 })
            wire1.setAttribute("scale", scale)
            wire1.setAttribute("gltf-model", "./models/barbed_wire_fence/scene.gltf")
            wire1.setAttribute("static-body", {})

            wire2.setAttribute("id", "wire2" + i)
            wire2.setAttribute("position", { x: posX, y: posY, z: 85 })
            wire2.setAttribute("scale", scale)
            wire2.setAttribute("gltf-model", "./models/barbed_wire_fence/scene.gltf")
            wire2.setAttribute("static-body", {})

            wire3.setAttribute("id", "wire3" + i)
            wire3.setAttribute("position", { x: -30, y: posY, z: posZ })
            wire3.setAttribute("scale", scale)
            wire3.setAttribute("gltf-model", "./models/barbed_wire_fence/scene.gltf")
            wire3.setAttribute("static-body", {})
            wire3.setAttribute("rotation", { x: 0, y: 90, z: 0 })

            wire4.setAttribute("id", "wire4" + i)
            wire4.setAttribute("position", { x: 50, y: posY, z: posZ })
            wire4.setAttribute("scale", scale)
            wire4.setAttribute("gltf-model", "./models/barbed_wire_fence/scene.gltf")
            wire4.setAttribute("static-body", {})
            wire4.setAttribute("rotation", { x: 0, y: 90, z: 0 })

            var sceneEl = document.querySelector("#scene")
            sceneEl.appendChild(wire1)
            sceneEl.appendChild(wire2)
            sceneEl.appendChild(wire3)
            sceneEl.appendChild(wire4)
        }
    }
})
AFRAME.registerComponent("boxes", {
    schema: {
        height: { type: "number", default: 2 },
        width: { type: "number", default: 2 },
        depth: { type: "number", default: 2 },
    },
    init: function () {
        //matriz de posición x
        px = [22.86, -17.35, -12.81, 0.44, -30.18,
            -25.89, 15.61, 29.68, 11.95, -15.40,
            -14.09, 34.76, 2.29, 21.77, 1.57,
            34.72, 12.04, -10.90, 6.48, 15.66];

        //matriz de posición z
        pz = [54.56, -4.71, 14.91, 56.74, 41.13,
            50.76, 57.84, 7.02, -5.24, -26.82,
            27.59, -35.78, 34.52, 31.32, -9.22,
            26.72, 48.90, 27.24, 9.94, 54.29];

        for (var i = 0; i < 20; i++) {
            var box = document.createElement("a-entity");
            box.setAttribute("id", "box" + i);

            posX = px[i]
            posY = 1;
            posZ = pz[i]

            position = { x: posX, y: posY, z: posZ };
            box.setAttribute("position", position);
            box.setAttribute("id", "box"+i)
            box.setAttribute("geometry", {
                primitive: "box",
                height: this.data.height,
                width: this.data.width,
                depth: this.data.depth,
            });

            box.setAttribute("material", {
                src: "./images/boxtexture1.jpg",
                repeat: "1 1 1",
            });

            box.setAttribute("dynamic-body", {});
            var sceneEl = document.querySelector("#scene");
            sceneEl.appendChild(box);
        }
    },
});