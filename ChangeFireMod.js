var camera, scene, renderer;
var camera2, scene2, renderer2;

var controls;
var keyboard = new KeyboardState();

var raycaster = new THREE.Raycaster();
var raycasterR = new THREE.Raycaster();

var tank, barrel, turret, ball;
var tankP, avatarBody, v, vP = new THREE.Vector3(1, 0, 0);
var ball;
var ballPos, force, vel;

var cameraOffset;
var upTemp = new THREE.Vector3();


var go = 0;
var angle = 0;
var change = 0;
var changeX = 0, changeY = 1, changeZ = 0;

var pickables = [];
var plane = [];

var intersects, intersectsR;
var laser, laserR;

init();
animate();

function buildPlane() {

  var material = new THREE.MeshBasicMaterial({
    side: THREE.BackSide
  });

  var plane = new THREE.Mesh(new THREE.PlaneGeometry(150, 150, 32, 32), material);

  return plane;

}

function buildTank() {

  var tank = new THREE.Object3D();
  var body = new THREE.Mesh(new THREE.BoxGeometry(20, 3, 10), new THREE.MeshBasicMaterial({
    color: 0x005121
  }));

  body.position.y = 1.5;
  tank.add(body);

  return tank;

}

function init() {

  var ww = $("#container").innerWidth();
  var hh = $("#container").innerHeight();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(ww, hh);
  renderer.setClearColor(0x888888);
  $("#container").append(renderer.domElement);

  renderer2 = new THREE.WebGLRenderer();
  renderer2.setSize(ww, hh);
  renderer2.setClearColor(0xbbbbbb);
  $("#container2").append(renderer2.domElement);

  ////////////////////////////////////////////////

  scene = new THREE.Scene();
  scene.add(new THREE.AxisHelper(25));

  camera = new THREE.PerspectiveCamera(90, ww / hh, 1, 1000);
  camera.position.z = 50;

  camera2 = new THREE.PerspectiveCamera(50, ww / hh, 1, 1000);
  camera2.position.z = 250;

  var grid = new THREE.GridHelper(150, 15, 'red', 'white');
  //scene.add(grid);
  grid.position.y = -75;

  controls = new THREE.OrbitControls(camera2, renderer2.domElement);

  //////////////////////////////////////////////////////////////////////////////

  tank = buildTank();
  turret = new THREE.Object3D();

  barrel = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 10), new THREE.MeshBasicMaterial({
    color: 0x222222
  }));
  barrel.position.x = 4;
  barrel.rotation.z = -Math.PI / 2;

  var head = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), new THREE.MeshBasicMaterial({color: 0x664c14}));

  turret.add(head, barrel);
  turret.position.y = 5;

  tank.add(turret);
  scene.add(tank);

  ////////////////////////////////////////////////////////////////////////

  ball = new THREE.Mesh(new THREE.SphereGeometry(0.9), new THREE.MeshBasicMaterial({
    color: 0xff0000
  }));
  //ball.visible = false;
  scene.add(ball);

  /////////////////////////////////////////////////////////////////////////////

  for (var i = 0; i < 6; i++) {

    plane[i] = buildPlane();
    plane[i].name = "plane" + i;
    pickables.push(plane[i]);
    scene.add(plane[i]);

  }

  plane[0].position.set(75, 0, 0);
  plane[0].rotation.y = Math.PI / 2;
  plane[0].material.color = new THREE.Color(0x49a3b7);

  plane[1].position.set(-75, 0, 0);
  plane[1].rotation.y = -Math.PI / 2;
  plane[1].material.color = new THREE.Color(0x8749b7);

  plane[2].position.set(0, 75, 0);
  plane[2].rotation.x = -Math.PI / 2;
  plane[2].material.color = new THREE.Color(0x408449);

  plane[3].position.set(0, -75, 0)
  plane[3].rotation.x = Math.PI / 2;
  plane[3].material.color = new THREE.Color(0xb78549);

  plane[4].position.set(0, 0, 75);
  plane[4].material.color = new THREE.Color(0xa1b749);

  plane[5].position.set(0, 0, -75);
  plane[5].rotation.y = Math.PI;
  plane[5].material.color = new THREE.Color(0x4949b7);

  window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

  var ww = $("#container").innerWidth();
  var hh = $("#container").innerHeight();

  camera.aspect = ww / hh;
  camera.updateProjectionMatrix();
  renderer.setSize(ww, hh);

  camera2.aspect = ww / hh;
  camera2.updateProjectionMatrix();

  renderer2.setSize(ww, hh);

}

function Matrix4Update(newPos, newDir) {

  var localX = newDir.clone();
  var localY = new THREE.Vector3(changeX, changeY, changeZ);
  var localZ = new THREE.Vector3();
  localZ.crossVectors(localX, localY);
  tank.matrix.makeBasis(localX, localY, localZ);
  tank.matrix.setPosition(newPos);
  tank.matrixAutoUpdate = false;

}

function moveOnNy() {

  var newPos = tank.localToWorld(new THREE.Vector3(go, 0, 0));
  newPos.y = -75;

  var newDir = vP.normalize();
  newDir.applyAxisAngle(new THREE.Vector3(0, 1, 0), change);
  Matrix4Update(newPos, newDir);

  cameraOffset = tank.localToWorld(new THREE.Vector3(-20, 7, 0));
  camera.position.set(cameraOffset.x, cameraOffset.y, cameraOffset.z);
  upTemp.set(0, 1, 0);
  camera.up.copy(upTemp);
  camera.lookAt(barrel.localToWorld(new THREE.Vector3(0, 10, 0)));

}

function moveOnPx() {

  var newPos = tank.localToWorld(new THREE.Vector3(go, 0, 0));
  newPos.x = 75;

  var newDir = vP.normalize();
  newDir.applyAxisAngle(new THREE.Vector3(-1, 0, 0), change);
  Matrix4Update(newPos, newDir);

  cameraOffset = tank.localToWorld(new THREE.Vector3(-20, 7, 0));
  camera.position.set(cameraOffset.x, cameraOffset.y, cameraOffset.z);
  upTemp.set(-1, 0, 0);
  camera.up.copy(upTemp);
  camera.lookAt(barrel.localToWorld(new THREE.Vector3(0, 10, 0)));

}

function moveOnPy() {

  var newPos = tank.localToWorld(new THREE.Vector3(go, 0, 0));
  newPos.y = 75;

  var newDir = vP.normalize();
  newDir.applyAxisAngle(new THREE.Vector3(0, -1, 0), change);
  Matrix4Update(newPos, newDir);

  cameraOffset = tank.localToWorld(new THREE.Vector3(-20, 7, 0));
  camera.position.set(cameraOffset.x, cameraOffset.y, cameraOffset.z);
  upTemp.set(0, -1, 0);
  camera.up.copy(upTemp);
  camera.lookAt(barrel.localToWorld(new THREE.Vector3(0, 10, 0)));

}

function moveOnNx() {

  var newPos = tank.localToWorld(new THREE.Vector3(go, 0, 0));
  newPos.x = -75;

  var newDir = vP.normalize();
  newDir.applyAxisAngle(new THREE.Vector3(1, 0, 0), change);
  Matrix4Update(newPos, newDir);

  cameraOffset = tank.localToWorld(new THREE.Vector3(-20, 7, 0));
  camera.position.set(cameraOffset.x, cameraOffset.y, cameraOffset.z);
  upTemp.set(1, 0, 0);
  camera.up.copy(upTemp);
  camera.lookAt(barrel.localToWorld(new THREE.Vector3(0, 10, 0)));

}

function moveOnPz() {

  var newPos = tank.localToWorld(new THREE.Vector3(go, 0, 0));
  newPos.z = 75;

  var newDir = vP.normalize();
  newDir.applyAxisAngle(new THREE.Vector3(0, 0, -1), change);
  Matrix4Update(newPos, newDir);

  cameraOffset = tank.localToWorld(new THREE.Vector3(-20, 7, 0));
  camera.position.set(cameraOffset.x, cameraOffset.y, cameraOffset.z);
  upTemp.set(0, 0, -1);
  camera.up.copy(upTemp);
  camera.lookAt(barrel.localToWorld(new THREE.Vector3(0, 10, 0)));

}

function moveOnNz() {

  var newPos = tank.localToWorld(new THREE.Vector3(go, 0, 0));
  newPos.z = -75;

  var newDir = vP.normalize();
  newDir.applyAxisAngle(new THREE.Vector3(0, 0, 1), change);
  Matrix4Update(newPos, newDir);

  cameraOffset = tank.localToWorld(new THREE.Vector3(-20, 7, 0));
  camera.position.set(cameraOffset.x, cameraOffset.y, cameraOffset.z);
  upTemp.set(0, 0, 1);
  camera.up.copy(upTemp);
  camera.lookAt(barrel.localToWorld(new THREE.Vector3(0, 10, 0)));

}

function makeLaser() {

  var laserBase = barrel.clone().position;
  var lineGeometry = new THREE.Geometry();
  var laserEnd = barrel.clone().worldToLocal(intersects[0].point.clone());

  lineGeometry.vertices.push(new THREE.Vector3(laserBase.x, laserBase.y, laserBase.z), new THREE.Vector3(laserEnd.y, laserEnd.x, laserEnd.z));
  lineGeometry.computeLineDistances();

  var lineMaterial = new THREE.LineDashedMaterial({
    color: 0xff0000,
    dashSize: 10,
    gapSize: 2
  });

  var line = new THREE.Line(lineGeometry, lineMaterial);

  return line;

}

function makeLaserR() {

  var laserBase = intersects[0].point;
  var lineGeometry = new THREE.Geometry();
  var laserEnd = intersectsR[0].point;

  lineGeometry.vertices.push(laserBase, laserEnd);
  lineGeometry.computeLineDistances();

  var lineMaterial = new THREE.LineDashedMaterial({
    color: 0xffffff,
    dashSize: 10,
    gapSize: 2
  });

  var line = new THREE.Line(lineGeometry, lineMaterial);

  return line;

}

function raytest() {

  var laserdir = barrel.clone().localToWorld(new THREE.Vector3(0, 1, 0)).sub(barrel.clone().localToWorld(new THREE.Vector3(0, 0, 0)));

  raycaster.set(barrel.localToWorld(new THREE.Vector3(0, 1, 0)), laserdir);
  intersects = raycaster.intersectObjects(pickables);

  if (intersects.length > 0) {

    //facePX
    if (intersects[0].object.name === "plane0") {

      var n = new THREE.Vector3(-1, 0, 0);

    }

    if (intersects[0].object.name === "plane1") {

      n = new THREE.Vector3(1, 0, 0);

    }

    if (intersects[0].object.name === "plane2") {

      n = new THREE.Vector3(0, -1, 0);

    }

    if (intersects[0].object.name === "plane3") {

      n = new THREE.Vector3(0, 1, 0);

    }

    if (intersects[0].object.name === "plane4") {

      n = new THREE.Vector3(0, 0, -1);

    }

    if (intersects[0].object.name === "plane5") {

      n = new THREE.Vector3(0, 0, 1);

    }

      var r = laserdir.sub(n.multiplyScalar(2 * (laserdir.dot(n))));

      raycasterR.set(intersects[0].point, r.normalize());
      intersectsR = raycasterR.intersectObjects(pickables);

  }

}

function animate() {

  keyboard.update();
  raytest();

  if (keyboard.pressed("W")) {

    go += 3;

    turret.remove(laser);
		scene.remove(laserR);

  }

  if (keyboard.pressed("A")) {

    change += 0.1;

    turret.remove(laser);
    scene.remove(laserR);

  }

  if (keyboard.pressed("D")) {

    change += -0.1;

    turret.remove(laser);
    scene.remove(laserR);

  }

  if (keyboard.pressed("I")) {

    angle += 0.05;
    turret.rotation.z = angle;

    turret.remove(laser);
    scene.remove(laserR);

  }

  if (keyboard.pressed("K")) {

    angle -= 0.05;
    turret.rotation.z = angle;

    turret.remove(laser);
    scene.remove(laserR);

  }

  if (keyboard.down("L")) {

    laser = makeLaser();
    laserR = makeLaserR();

    turret.add(laser);
    scene.add(laserR);

  }

  if (keyboard.up("L")) {

    turret.remove(laser);
    scene.remove(laserR);

  }

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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  go = 0;
  change = 0;
  controls.update();
  requestAnimationFrame(animate);
  render();

}

function render() {

  renderer.render(scene, camera);
  renderer2.render(scene, camera2);

}


function fireBall(){


}


window.focus();
