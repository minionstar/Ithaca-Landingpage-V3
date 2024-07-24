export default `varying vec2 vUv;
uniform float posX;
uniform float posY;
uniform float radius;
uniform float colorDetector;
uniform float isHovered;
uniform float mouseX;
uniform float mouseY;
uniform float gridOut;


float getRectangle(vec2 offset, vec2 uv, float edge, float widthX, float heightY) {
    // Rotation angle in radians (30 degrees)
    float angle = radians(45.0);

    uv.x += offset.x;
    uv.y += offset.y;

    // Rotation matrix components
    float s = sin(angle);
    float c = cos(angle);

    // Calculate rotated coordinates
    float rotatedX = c * (uv.x - posX) - s * (uv.y - posY) + posX;
    float rotatedY = s * (uv.x - posX) + c * (uv.y - posY) + posY;

    // Crop Rectangle
    float rectangleAlphaX = smoothstep(posX - widthX - edge, posX - widthX + edge, rotatedX) - smoothstep(posX + widthX - edge, posX + widthX + edge, rotatedX);
    float rectangleAlphaY = smoothstep(posY - heightY - edge, posY - heightY + edge , rotatedY) - smoothstep(posY + heightY - edge, posY + heightY + edge, rotatedY);
    float rectangleAlpha = rectangleAlphaX * rectangleAlphaY;

    return rectangleAlpha;
}


void main() {
    vec2 invertedUV = vec2(1.0 - vUv.x, 1.0 - vUv.y);

    // Outline Alpha
    float width = 0.015;
    float outline1 = step(0.0+width/2.0, invertedUV.y) * step(invertedUV.y, 1.0-width/2.0);
    float outline2 = step(0.0+width/2.0, invertedUV.x) * step(invertedUV.x, 1.0-width/2.0);
    float outline3 = step(0.0+width/2.0, 1.0 - invertedUV.y) * step(invertedUV.y, 1.0-width/2.0);
    float outline4 = step(0.0+width/2.0, 1.0 - invertedUV.x) * step(invertedUV.x, 1.0-width/2.0);
    float outlineAlpha = 1. - outline1 * outline2 * outline3 * outline4;

    // Fill Alpha 
    float fillAlpha = step(0.85, colorDetector);
    fillAlpha -= fillAlpha * outlineAlpha;

    // Fill Outline Part & Inner Part
    vec3 outlineColor = vec3(1.0, 1.0, 1.0);
    vec3 outlineActiveColor = vec3(0.25, 1.0*1.5, 0.29*2.);
    vec3 fillColor = vec3(0.55, 1.0, 0.89);

    float outlineEdge = 0.3;

    if(isHovered != 0.0 && colorDetector > 0.85){
        fillAlpha = fillAlpha * (1.0 - isHovered);
        outlineColor = mix(outlineColor, outlineActiveColor, isHovered);
        outlineEdge *= (1.0 + isHovered * 4.);
    }

    outlineColor *= outlineAlpha * outlineEdge;
    fillColor *= fillAlpha * 0.2;

    
    // Get Rectangle Alpha
    float rectangleLeft = getRectangle(vec2(5., 0.), invertedUV, 2.5, 2.0, 2.0);
    float rectangleRight = getRectangle(vec2(-5., 0.), invertedUV, 2.5, 2.0, 2.0);
    float rectangleAlpha = rectangleLeft + rectangleRight;

    //get second Alpha
    float mouseRectangleAlpha = getRectangle(vec2(mouseX, mouseY), invertedUV, 1.5, 1.0, 1.0) * 1.0;
    // Rectangle Top Right / to remove hover effect there
    float rectangleTopRightMask = getRectangle(vec2(7., 5.), invertedUV, .5, 4.0, 4.0);
    mouseRectangleAlpha *= (1. - rectangleTopRightMask);

    float allRectanglesAlpha = min(mouseRectangleAlpha + rectangleAlpha, 1.0);

    float alpha = (outlineAlpha + fillAlpha) * (allRectanglesAlpha);
    vec3 color = fillColor + outlineColor;

    float speedOut = max((1.0-gridOut*(colorDetector+1.)), 0.);

    gl_FragColor = vec4(color, alpha*speedOut);
}`