export default `varying vec2 vUv;
uniform float uTime;
uniform float startTime;
uniform float fadeInDuration;
uniform float direction;
uniform float gridOut;

void main() {
    vec2 invertedUV = vec2(1.0 - vUv.x, 1.0 - vUv.y);

    float width = 0.015;
    float outline1 = step(0.0 + width / 2.0, invertedUV.y) * step(invertedUV.y, 1.0 - width / 2.0);
    float outline2 = step(0.0 + width / 2.0, invertedUV.x) * step(invertedUV.x, 1.0 - width / 2.0);
    float outline3 = step(0.0 + width / 2.0, 1.0 - invertedUV.y) * step(invertedUV.y, 1.0 - width / 2.0);
    float outline4 = step(0.0 + width / 2.0, 1.0 - invertedUV.x) * step(invertedUV.x, 1.0 - width / 2.0);
    float outline = outline1 * outline2 * outline3 * outline4;

    float offset = uTime * 0.3;

    float circlePos;

    //Direction
    direction == -1.0 ? circlePos = 1.0 - fract(offset + startTime) : circlePos = mod(offset + startTime, 1.0);

    float circleRadius = 0.3;

    float fadeOutDuration = 15.0;
    float fadeOutStart = 0.0;
    float fadeInStart = fadeOutStart + fadeOutDuration;
    float totalDuration = fadeOutDuration + fadeInDuration;

    float periodTime = mod(uTime, totalDuration);

    float fade = 1.0;

    if (periodTime < fadeOutStart + fadeOutDuration) {
        float fadeOutProgress = smoothstep(0.0, fadeOutDuration, periodTime - fadeOutStart);
        fade = 1.0 - fadeOutProgress;
    } else if (periodTime >= fadeInStart) {
        float fadeInProgress = smoothstep(0.0, fadeInDuration, periodTime - fadeInStart);
        fade = fadeInProgress;
    }

    vec2 circleCenter;

    float circleOffset = 0.10;

    if (circlePos < 0.25) {
        circleCenter = vec2(circlePos * 4.0, 0.0);
    } else if (circlePos < 0.5) {
        circleCenter = vec2(1.0, (circlePos - 0.25) * 4.0);
    } else if (circlePos < 0.75) {
        circleCenter = vec2(1.0 - (circlePos - 0.5) * 4.0, 1.0);
    } else {
        circleCenter = vec2(0.0, 1.0 - (circlePos - 0.75) * 4.0);
    }

    float distanceToCircle = length(invertedUV - circleCenter) + 0.25;



    float insideOpacity = 0.0;
    float outsideOpacity = 1.0;
    float opacity = mix(outsideOpacity, insideOpacity, outline) * fade;

    vec3 circleColor = vec3(0.25, 1.0, 0.29) * 0.5;

    float finalAlpha = smoothstep(distanceToCircle - 0.5, distanceToCircle - 0.5 + 0.2, circleRadius);



    finalAlpha = finalAlpha;
    float speedOut = max((1.0-gridOut*2.), 0.);

    gl_FragColor = vec4(circleColor, opacity*finalAlpha*speedOut);
}`


