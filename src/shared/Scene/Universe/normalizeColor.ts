export const normalizeColor = `
    vec3 normalizeColor(vec3 color) {
        return vec3(color.r/255., color.g/255., color.b/255.);
    }
`