export default `varying vec2 vUv;
uniform float uTime;
uniform float startTime;
uniform float fadeInDuration;
uniform float direction;
uniform float gridOut;
uniform float colorDetector;
uniform float isHovered;
uniform float rotation;

void main() {
    vec2 invertedUV = vec2(1.0 - vUv.x, 1.0 - vUv.y);

    float width = 0.01;
    float outline1 = step(0.0 + width / 2.0, invertedUV.y) * step(invertedUV.y, 1.0 - width / 2.0);
    float outline2 = step(0.0 + width / 2.0, invertedUV.x) * step(invertedUV.x, 1.0 - width / 2.0);
    float outline3 = step(0.0 + width / 2.0, 1.0 - invertedUV.y) * step(invertedUV.y, 1.0 - width / 2.0);
    float outline4 = step(0.0 + width / 2.0, 1.0 - invertedUV.x) * step(invertedUV.x, 1.0 - width / 2.0);
    float outline = outline1 * outline2 * outline3 * outline4;

    float offset = isHovered * 0.3;

    float circlePos;

    //Direction
    direction == -1.0 ? circlePos = 1.0 - fract(offset + startTime) : circlePos = mod(offset + startTime, 1.0);

    float circleRadius = 0.3;
    float smallCircleRadius = 0.03;



    vec2 circleCenter;
    vec2 circleSmall1Center;
    vec2 circleSmall2Center;

    float circleOffset = 0.10;

    if (circlePos < 0.25) {
        circleCenter = vec2(circlePos * 4.0, 0.0);
        circleSmall1Center = circleCenter - vec2(circleOffset, 0.);
        circleSmall2Center = circleCenter + vec2(circleOffset, 0.);
    } else if (circlePos < 0.5) {
        circleCenter = vec2(1.0, (circlePos - 0.25) * 4.0);
        circleSmall1Center = circleCenter - vec2(0.0, circleOffset);
        circleSmall2Center = circleCenter + vec2(0.0, circleOffset);
    } else if (circlePos < 0.75) {
        circleCenter = vec2(1.0 - (circlePos - 0.5) * 4.0, 1.0);
        circleSmall1Center = circleCenter - vec2(-circleOffset, 0.0);
        circleSmall2Center = circleCenter + vec2(-circleOffset, 0.0);
    } else {
        circleCenter = vec2(0.0, 1.0 - (circlePos - 0.75) * 4.0);
        circleSmall1Center = circleCenter - vec2(0.0, -circleOffset);
        circleSmall2Center = circleCenter + vec2(0.0, -circleOffset);
    }

    float distanceToCircle = length(invertedUV - circleCenter) + 0.52;
    float distanceToCircle1Small = length(invertedUV - circleSmall1Center);
    float distanceToCircle2Small = length(invertedUV - circleSmall2Center);


    float insideOpacity = 0.0;
    float outsideOpacity = 1.0;
    float opacity = mix(outsideOpacity, insideOpacity, outline);

    vec3 circleColor = vec3(0.25, 1.0, 0.29) * .5;

    float finalAlpha = smoothstep(distanceToCircle - 0.5, distanceToCircle - 0.5 + 0.2, circleRadius);
 
    float smallerCircle1 = smoothstep(distanceToCircle1Small, distanceToCircle1Small + 0.0001, smallCircleRadius);
    float smallerCircle2 = smoothstep(distanceToCircle2Small, distanceToCircle2Small + 0.0001, smallCircleRadius);


    finalAlpha = max(finalAlpha - (smallerCircle1 + smallerCircle2), 0.0);
    float speedOut = max((1.0-gridOut*2.), 0.);

    float isVisible = 0.0;

    // if(isHovered > 0.0 && isHovered < 2.0) {
    // }
    isVisible = mix(0.0, 1.0, 3. - isHovered);


    float alpha = opacity*finalAlpha*speedOut*isVisible;

    if(colorDetector < 0.85) {
        circleColor = vec3(0.0);
        alpha = 0.0;
    }

    

    gl_FragColor = vec4(circleColor, alpha);
}`