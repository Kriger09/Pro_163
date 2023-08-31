AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullets,2000)
    },
    shootEnemyBullets: function () {
        var enemy = document.querySelectorAll(".enemy")
        for (var i = 0; i < enemy.length; i++) {
            var ebullet = document.createElement("a-entity")
            ebullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1
            })
            ebullet.setAttribute("material", "color", "red")
            var pos = enemy[i].getAttribute("position")
            ebullet.setAttribute("position", {
                x: pos.x + 1.5,
                y: pos.y + 3.5,
                z: pos.z,
            })
            var scene = document.querySelector("#scene")
            scene.appendChild(ebullet)
            var tank = enemy[i].object3D
            var player = document.querySelector("#weapon").object3D
            var position1 = new THREE.Vector3()
            var position2 = new THREE.Vector3()
            player.getWorldPosition(position1)
            tank.getWorldPosition(position2)
            var direction = new THREE.Vector3()
            direction.subVectors(position1, position2).normalize()
            ebullet.setAttribute("velocity", direction.multiplyScalar(10))
            ebullet.setAttribute("dynamic-body", {
                shape: "sphere",
                mass: 0
            })
            var element = document.querySelector("#countLife")
            var life = parseInt(element.getAttribute("text").value)
            ebullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {
                    if (life > 0) {
                        life -= 1
                        element.setAttribute("text", { value: life })
                    }
                    if (life <= 0) {
                        var txt = document.querySelector("#over")
                        txt.setAttribute("visible",true)
                        var tankEl=document.querySelectorAll(".enemy")
                        for (var i = 0; i < tankEl.length; i++) {
                            scene.removeChild(tankEl[i])
                        }
                    }
                }
            })
        }
    }
})