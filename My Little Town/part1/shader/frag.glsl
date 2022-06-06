// ==================================================================
#version 330 core

// The final output color of each 'fragment' from our fragment shader.
out vec4 FragColor;

// Our light source data structure
struct PointLight{
    vec3 lightColor;
    vec3 lightPos;
    float ambientIntensity;

    float specularStrength;

    float constant;
    float linear;
    float quadratic;

    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};

uniform PointLight pointLights[8];


// Used for our specular highlights
uniform mat4 view;


// Import our normal data
in vec3 myNormal;
// Import our texture coordinates from vertex shader
in vec2 v_texCoord;
// Import the fragment position
in vec3 FragPos;

// If we have texture coordinates, they are stored in this sampler.
uniform sampler2D u_DiffuseMap; 

// Function prototypes
vec3 CalcPointLight(PointLight light, vec3 normal, vec3 fragPos, vec3 viewDir);

void main()
{
    // Compute the normal direction
    vec3 norm = normalize(myNormal);
    
    // Store our final texture color
    vec3 diffuseColor;
    diffuseColor = texture(u_DiffuseMap, v_texCoord).rgb;

    // (1) Compute ambient light
    vec3 ambient = pointLights[1].ambientIntensity * pointLights[1].lightColor;

    // (2) Compute diffuse light
    // From our lights position and the fragment, we can get
    // a vector indicating direction
    // Note it is always good to 'normalize' values.
    vec3 lightDir = normalize(pointLights[1].lightPos - FragPos);
    // Now we can compute the diffuse light impact
    float diffImpact = max(dot(norm, lightDir), 0.0);
    vec3 diffuseLight = diffImpact * pointLights[1].lightColor;

    // (3) Compute Specular lighting
    vec3 viewPos = vec3(0.0,0.0,0.0);
    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 reflectDir = reflect(-lightDir, norm);

    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32);
    vec3 specular = pointLights[1].specularStrength * spec * pointLights[1].lightColor;

    // Since I am going to only add 4 point lights in the scene
    // Our final color is now based on the texture.
    // That is set by the diffuseColor
    vec3 Lighting = diffuseLight + ambient + specular;
    // Directional lighting
    vec3 result = diffuseColor*Lighting;
    // Point lights
    for (int i = 0; i<7; i++){
        result += diffuseColor*CalcPointLight(pointLights[i], norm, FragPos, viewDir);}

    // Final color + "how dark or light to make fragment"
    //if(gl_FrontFacing){
        //FragColor = vec4(diffuseColor * Lighting,1.0);
    //}else{
        // Additionally color the back side only the directional lighting
         FragColor = vec4(result,1.0);
    //}
}

vec3 CalcPointLight(PointLight light, vec3 normal, vec3 fragPos, vec3 viewDir)
{ 
    vec3 lightDir = normalize(light.lightPos - fragPos);
    // Diffuse shading
    float diff = max(dot(normal, lightDir), 0.0);
    // Specular shading
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 16);
    // Computing attenuation
    // distance and lighting... 
    float distance = length(light.lightPos - fragPos);
    float attenuation = 1.0/(light.constant + light.linear*distance + light.quadratic*(distance * distance));  
    // Combine results
    vec3 ambient = light.ambientIntensity * light.lightColor;
    vec3 diffuse = diff * light.lightColor;
    vec3 specular = spec * light.specularStrength * light.lightColor;
    ambient *= attenuation;
    diffuse *= attenuation;
    specular *= attenuation;
    return (ambient + diffuse + specular);
}



// ==================================================================
