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

// Used for change point light
//uniform int id;

uniform PointLight pointLights[9];

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
    vec3 diffuseColor;
    diffuseColor = texture(u_DiffuseMap, v_texCoord).rgb;

    // Compute diffuse light
    vec3 lightDir = normalize(pointLights[8].lightPos - FragPos);
    // Now we can compute the diffuse light impact
    float diffImpact = max(dot(norm, lightDir), 0.0);
    vec3 diffuseLight = diffImpact * pointLights[8].lightColor;

    vec3 Lighting = diffuseLight;
    vec3 viewPos = vec3(0.0,0.0,0.0);
    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 result = diffuseColor*CalcPointLight(pointLights[8], norm, FragPos, viewDir);

    // Final color + "how dark or light to make fragment"
    FragColor = vec4(result,1.0);
   
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
