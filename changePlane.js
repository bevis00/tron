
function changePlane(){

  var detection = tank.localToWorld(new THREE.Vector3(10, 0, 0));
  //console.log(detection);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //faceNy, up = +Y = Vector3(0, 1, 0)
  if (changeX === 0 && changeY === 1 && changeZ === 0 && detection.x <= 75 && detection.x >= -75 && detection.z <= 75 && detection.z >= -75)
    moveOnNy();

  //change to facePx
  if (changeX === 0 && changeY === 1 && changeZ === 0 && detection.x > 75) {

    changeX = -1;
    changeY = 0;
    changeZ = 0;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);

  }

  //change to faceNx
  if (changeX === 0 && changeY === 1 && changeZ === 0 && detection.x < -75) {

    changeX = 1;
    changeY = 0;
    changeZ = 0;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI / 2);

  }

  //change to faceNz
  if (changeX === 0 && changeY === 1 && changeZ === 0 && detection.z < -75) {

    changeX = 0;
    changeY = 0;
    changeZ = 1;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);

  }

  //change to facePz
  if (changeX === 0 && changeY === 1 && changeZ === 0 && detection.z > 75) {

    changeX = 0;
    changeY = 0;
    changeZ = -1;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);

  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //facePx, up = -x = Vector3(-1, 0, 0)
  if (changeX === -1 && changeY === 0 && changeZ === 0 && detection.y <= 75 && detection.y >= -75 && detection.z <= 75 && detection.z >= -75)
    moveOnPx();

  //change to facePy
  if (changeX === -1 && changeY === 0 && changeZ === 0 && detection.y > 75) {

    changeX = 0;
    changeY = -1;
    changeZ = 0;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);

  }

  //change to faceNy
  if (changeX === -1 && changeY === 0 && changeZ === 0 && detection.y < -75) {

    changeX = 0;
    changeY = 1;
    changeZ = 0;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI / 2);

  }

  //change to faceNz
  if (changeX === -1 && changeY === 0 && changeZ === 0 && detection.z < -75) {

    changeX = 0;
    changeY = 0;
    changeZ = 1;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

  }

  //change to facePz
  if (changeX === -1 && changeY === 0 && changeZ === 0 && detection.z > 75) {

    changeX = 0;
    changeY = 0;
    changeZ = -1;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2);

  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //facePy, up = -Y = Vector3(0, -1, 0)
  if (changeX === 0 && changeY === -1 && changeZ === 0 && detection.x <= 75 && detection.x >= -75 && detection.z <= 75 && detection.z >= -75)
    moveOnPy();

  //change to faceNx
  if (changeX === 0 && changeY === -1 && changeZ === 0 && detection.x < -75) {

    changeX = 1;
    changeY = 0;
    changeZ = 0;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);

  }

  //change to facePx
  if (changeX === 0 && changeY === -1 && changeZ === 0 && detection.x > 75) {

    changeX = -1;
    changeY = 0;
    changeZ = 0;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI / 2);

  }

  //change to facePz
  if (changeX === 0 && changeY === -1 && changeZ === 0 && detection.z > 75) {

    changeX = 0;
    changeY = 0;
    changeZ = -1;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);

  }

  //change to faceNz
  if (changeX === 0 && changeY === -1 && changeZ === 0 && detection.z < -75) {

    changeX = 0;
    changeY = 0;
    changeZ = 1;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);

  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //faceNx, up = x = Vector3(1, 0, 0)
  if (changeX === 1 && changeY === 0 && changeZ === 0 && detection.y <= 75 && detection.y >= -75 && detection.z <= 75 && detection.z >= -75)
    moveOnNx();

  //change to faceNy
  if (changeX === 1 && changeY === 0 && changeZ === 0 && detection.y < -75) {

    changeX = 0;
    changeY = 1;
    changeZ = 0;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);

  }

  //change to facePy
  if (changeX === 1 && changeY === 0 && changeZ === 0 && detection.y > 75) {

    changeX = 0;
    changeY = -1;
    changeZ = 0;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI / 2);

  }

  //change to facePz
  if (changeX === 1 && changeY === 0 && changeZ === 0 && detection.z > 75) {

    changeX = 0;
    changeY = 0;
    changeZ = -1;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

  }

  //change to faceNz
  if (changeX === 1 && changeY === 0 && changeZ === 0 && detection.z < -75) {

    changeX = 0;
    changeY = 0;
    changeZ = 1;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2);

  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //faceNz, up = +z = Vector3(0, 0, 1)
  if (changeX === 0 && changeY === 0 && changeZ === 1 && detection.y <= 75 && detection.y >= -75 && detection.x <= 75 && detection.x >= -75)
    moveOnNz();

  //change to facePy
  if (changeX === 0 && changeY === 0 && changeZ === 1 && detection.y > 75) {

    changeX = 0;
    changeY = -1;
    changeZ = 0;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);

  }

  //change to faceNy
  if (changeX === 0 && changeY === 0 && changeZ === 1 && detection.y < -75) {

    changeX = 0;
    changeY = 1;
    changeZ = 0;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);

  }

  //change to faceNx
  if (changeX === 0 && changeY === 0 && changeZ === 1 && detection.x < -75) {

    changeX = 1;
    changeY = 0;
    changeZ = 0;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

  }

  //change to facePx
  if (changeX === 0 && changeY === 0 && changeZ === 1 && detection.x > 75) {

    changeX = -1;
    changeY = 0;
    changeZ = 0;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2);

  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //facePz, up = -z = Vector3(0, 0, -1)
  if (changeX === 0 && changeY === 0 && changeZ === -1 && detection.y <= 75 && detection.y >= -75 && detection.x <= 75 && detection.x >= -75)
    moveOnPz();

  //change to faceNy
  if (changeX === 0 && changeY === 0 && changeZ === -1 && detection.y < -75) {

    changeX = 0;
    changeY = 1;
    changeZ = 0;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);

  }

  //change to facePy
  if (changeX === 0 && changeY === 0 && changeZ === -1 && detection.y > 75) {

    changeX = 0;
    changeY = -1;
    changeZ = 0;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);

  }

  //change to facePx
  if (changeX === 0 && changeY === 0 && changeZ === -1 && detection.x > 75) {

    changeX = -1;
    changeY = 0;
    changeZ = 0;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

  }

  //change to faceNx
  if (changeX === 0 && changeY === 0 && changeZ === -1 && detection.x < -75) {

    changeX = 1;
    changeY = 0;
    changeZ = 0;

    avatarBody = detection.clone().sub(tank.localToWorld(new THREE.Vector3(0, 0, 0)));
    tankP = tank.clone().localToWorld(new THREE.Vector3(0, 0, 0)).add(avatarBody.clone().add(avatarBody));
    v = tankP.clone().sub(detection);
    vP = v.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2);

  }
  
}
