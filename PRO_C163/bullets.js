AFRAME.registerComponent("bullets",{
    init: function(){
        this.shootBullet()
    },
    shootBullet: function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key=="z"){
                var bullet=document.createElement("a-entity")
                bullet.setAttribute("geometry",{
                    primitive:"sphere",
                    radius: 0.1
                })
                bullet.setAttribute("material","color","black")
                var cam=document.querySelector("#camera-rig")
                var pos=cam.getAttribute("position")
                bullet.setAttribute("position",{
                    x:pos.x,
                    y:pos.y+1,
                    z:pos.z-0.4,
                })
                var camera=document.querySelector("#camera").object3D
                var direction=new THREE.Vector3()
                camera.getWorldDirection(direction)
                bullet.setAttribute("velocity",direction.multiplyScalar(-10))
                var scene=document.querySelector("#scene")
                bullet.setAttribute("dynamic-body",{
                    shape:"sphere",
                    mass:0
                })
                bullet.addEventListener("collide", this.removeBullet)
                scene.appendChild(bullet)
                this.shootSound()
            }
        })
    },
    removeBullet: function(e){
        var scene=document.querySelector("#scene")
        var element=e.detail.target.el
        var elementHit=e.detail.body.el
        if(elementHit.id.includes("enemy")){
            var countTankEl=document.querySelector("#countTank")
            var tankFired=parseInt(countTankEl.getAttribute("text").value)
            tankFired-=1
            countTankEl.setAttribute("text",{value:tankFired})
            if(tankFired==0){
                var txt=document.querySelector("#completed")
                txt.setAttribute("visible",true)
            }
            //var impulse=new CANNON.Vec3(-2,2,1)
            //var point=new CANNON.Vec3().copy(elementHit.getAttribute("position"))
            //elementHit.body.applyImpulse(impulse,point)
            scene.removeChild(elementHit)
        }
        element.removeEventListener("collide",this.shoot)
        scene.removeChild(element)
    },
    shootSound: function(){
        var entity=document.querySelector("#sound1")
        entity.components.sound.playSound()
    }
})