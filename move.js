
function Matrix4Update(newPos, newDir, newMiniPos) {

  localX = newDir.clone();
  localY = new THREE.Vector3(changeX, changeY, changeZ);
  localZ = new THREE.Vector3();
  localZ.crossVectors(localX, localY);
  tank.matrix.makeBasis(localX, localY, localZ);
  tank.matrix.setPosition(newPos);
  tank.matrixAutoUpdate = false;

  //////////////////////////////////////////////////////////////////////////////

  miniAvatar.matrix.makeBasis(localX, localY, localZ);
  miniAvatar.matrix.setPosition(newMiniPos);
  miniAvatar.matrixAutoUpdate = false;

}

function moveOnNy() {

  var newPos = tank.localToWorld(new THREE.Vector3(go, 0, 0));
  newPos.y = -67;

  var newMiniPos = newPos.clone();
  newMiniPos.y = -75

  var newDir = vP.normalize();
  newDir.applyAxisAngle(new THREE.Vector3(0, 1, 0), change);
  Matrix4Update(newPos, newDir, newMiniPos);

  cameraOffset = tank.localToWorld(new THREE.Vector3(-35, 7, 20));
  camera.position.set(cameraOffset.x, cameraOffset.y, cameraOffset.z);
  upTemp.set(0, 1, 0);
  camera.up.copy(upTemp);
  camera.lookAt(barrel.localToWorld(new THREE.Vector3(0, 10, 0)));

  gameOverHint.position.copy(tank.localToWorld(new THREE.Vector3(-20,10,0)));
  gameOverHint.up.copy(upTemp);
  gameOverHint.lookAt(tank.localToWorld(new THREE.Vector3(-30,10,0)));

  if(gameStart === false){

    gameStartHint.position.copy(camera.localToWorld(new THREE.Vector3(0,0,-20)));
    gameStartHint.lookAt(camera.localToWorld(new THREE.Vector3(0,0,100)));

  }

}

function moveOnPx() {

  var newPos = tank.localToWorld(new THREE.Vector3(go, 0, 0));
  newPos.x = 67;

  var newMiniPos = newPos.clone();
  newMiniPos.x = 75

  var newDir = vP.normalize();
  newDir.applyAxisAngle(new THREE.Vector3(-1, 0, 0), change);
  Matrix4Update(newPos, newDir, newMiniPos);

  cameraOffset = tank.localToWorld(new THREE.Vector3(-45, 7, 0));
  camera.position.set(cameraOffset.x, cameraOffset.y, cameraOffset.z);
  upTemp.set(-1, 0, 0);
  camera.up.copy(upTemp);
  camera.lookAt(barrel.localToWorld(new THREE.Vector3(0, 10, 0)));

  gameOverHint.position.copy(tank.localToWorld(new THREE.Vector3(-20,10,0)));
  gameOverHint.up.copy(upTemp);
  gameOverHint.lookAt(tank.localToWorld(new THREE.Vector3(-30,10,0)));

}

function moveOnPy() {

  var newPos = tank.localToWorld(new THREE.Vector3(go, 0, 0));
  newPos.y = 67;

  var newMiniPos = newPos.clone();
  newMiniPos.y = 75

  var newDir = vP.normalize();
  newDir.applyAxisAngle(new THREE.Vector3(0, -1, 0), change);
  Matrix4Update(newPos, newDir, newMiniPos);

  cameraOffset = tank.localToWorld(new THREE.Vector3(-45, 7, 0));
  camera.position.set(cameraOffset.x, cameraOffset.y, cameraOffset.z);
  upTemp.set(0, -1, 0);
  camera.up.copy(upTemp);
  camera.lookAt(barrel.localToWorld(new THREE.Vector3(0, 10, 0)));

  gameOverHint.position.copy(tank.localToWorld(new THREE.Vector3(-20,10,0)));
  gameOverHint.up.copy(upTemp);
  gameOverHint.lookAt(tank.localToWorld(new THREE.Vector3(-30,10,0)));

}

function moveOnNx() {

  var newPos = tank.localToWorld(new THREE.Vector3(go, 0, 0));
  newPos.x = -67;

  var newMiniPos = newPos.clone();
  newMiniPos.x = -75

  var newDir = vP.normalize();
  newDir.applyAxisAngle(new THREE.Vector3(1, 0, 0), change);
  Matrix4Update(newPos, newDir, newMiniPos);

  cameraOffset = tank.localToWorld(new THREE.Vector3(-45, 7, 0));
  camera.position.set(cameraOffset.x, cameraOffset.y, cameraOffset.z);
  upTemp.set(1, 0, 0);
  camera.up.copy(upTemp);
  camera.lookAt(barrel.localToWorld(new THREE.Vector3(0, 10, 0)));

  gameOverHint.position.copy(tank.localToWorld(new THREE.Vector3(-20,10,0)));
  gameOverHint.up.copy(upTemp);
  gameOverHint.lookAt(tank.localToWorld(new THREE.Vector3(-30,10,0)));

}

function moveOnPz() {

  var newPos = tank.localToWorld(new THREE.Vector3(go, 0, 0));
  newPos.z = 67;

  var newMiniPos = newPos.clone();
  newMiniPos.z = 75

  var newDir = vP.normalize();
  newDir.applyAxisAngle(new THREE.Vector3(0, 0, -1), change);
  Matrix4Update(newPos, newDir, newMiniPos);

  cameraOffset = tank.localToWorld(new THREE.Vector3(-45, 7, 0));
  camera.position.set(cameraOffset.x, cameraOffset.y, cameraOffset.z);
  upTemp.set(0, 0, -1);
  camera.up.copy(upTemp);
  camera.lookAt(barrel.localToWorld(new THREE.Vector3(0, 10, 0)));

  gameOverHint.position.copy(tank.localToWorld(new THREE.Vector3(-20,10,0)));
  gameOverHint.up.copy(upTemp);
  gameOverHint.lookAt(tank.localToWorld(new THREE.Vector3(-30,10,0)));

}

function moveOnNz() {

  var newPos = tank.localToWorld(new THREE.Vector3(go, 0, 0));
  newPos.z = -67;

  var newMiniPos = newPos.clone();
  newMiniPos.z = -75

  var newDir = vP.normalize();
  newDir.applyAxisAngle(new THREE.Vector3(0, 0, 1), change);
  Matrix4Update(newPos, newDir, newMiniPos);

  cameraOffset = tank.localToWorld(new THREE.Vector3(-45, 7, 0));
  camera.position.set(cameraOffset.x, cameraOffset.y, cameraOffset.z);
  upTemp.set(0, 0, 1);
  camera.up.copy(upTemp);
  camera.lookAt(barrel.localToWorld(new THREE.Vector3(0, 10, 0)));

  gameOverHint.position.copy(tank.localToWorld(new THREE.Vector3(-20,10,0)));
  gameOverHint.up.copy(upTemp);
  gameOverHint.lookAt(tank.localToWorld(new THREE.Vector3(-30,10,0)));

}
