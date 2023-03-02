function computeVisibleFaces(triangle, cameraPosition, cameraAngle, screenAngle) {
  // Convert angles to radians
  const cameraAngleRadians = cameraAngle * Math.PI / 180;
  const screenAngleRadians = screenAngle * Math.PI / 180;

  // Calculate camera direction vector
  const cameraDirection = [
    Math.sin(cameraAngleRadians),
    0,
    Math.cos(cameraAngleRadians),
  ];

  // Calculate screen plane normal vector
  const screenNormal = [
    0,
    Math.sin(screenAngleRadians),
    -Math.cos(screenAngleRadians),
  ];

  // Calculate triangle normal vector
  const triangleNormal = computeTriangleNormal(triangle);

  // Calculate vector from camera to triangle
  const cameraToTriangle = [
    triangle[0] - cameraPosition[0],
    triangle[1] - cameraPosition[1],
    triangle[2] - cameraPosition[2],
  ];

  // Calculate angle between camera direction and camera-to-triangle vector
  const cameraAngleToTriangle = Math.acos(
    dotProduct(cameraDirection, cameraToTriangle) /
    (vectorLength(cameraDirection) * vectorLength(cameraToTriangle))
  );

  // Calculate angle between screen normal and camera-to-triangle vector
  const screenAngleToTriangle = Math.acos(
    dotProduct(screenNormal, cameraToTriangle) /
    (vectorLength(screenNormal) * vectorLength(cameraToTriangle))
  );

  // Determine if triangle is visible or hidden
  const isTriangleVisible = dotProduct(cameraToTriangle, triangleNormal) < 0;

  // Determine if triangle is facing towards the screen
  const isTriangleFacingScreen = dotProduct(screenNormal, triangleNormal) < 0;

  // Determine if triangle is facing towards the camera
  const isTriangleFacingCamera = cameraAngleToTriangle < Math.PI / 2;

  // Determine if triangle is within the field of view of the screen
  const isTriangleInFieldOfView = screenAngleToTriangle < Math.PI / 2;

  // If triangle is visible and facing the screen and within the field of view
  // of the screen, then it should be displayed
  if (isTriangleVisible && isTriangleFacingScreen && isTriangleInFieldOfView) {
    return 1;
  } else {
    return 0;
  }
}
