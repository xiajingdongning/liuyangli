#include "Object.hpp"
#include "Camera.hpp"
#include "Error.hpp"
#include <fstream>
#include <sstream>
using namespace std;

Object::Object(){
}

Object::~Object(){
    
}

string Object::parseMtl(string path) {

    string line;
    string ppmPath = "";
    ifstream mtlFile(path.c_str());

    if (mtlFile.is_open()) {
        while (getline(mtlFile, line)) {
            // std::cout << line << std::endl;
            if (line.substr(0, 7) == "map_Kd ") {
                istringstream in(line);

                string header;
                in >> header;

                string ppmFileName;
                in >> ppmFileName;

                vector<string> pathComponents;
                string pathComponent;
                istringstream pathSplit(path);
                while (getline(pathSplit, pathComponent, '/')) {
                    pathComponents.push_back(pathComponent);
                    pathComponents.push_back("/");
                }

                pathComponents.pop_back();  // remove ending backslash
                pathComponents.pop_back();  // remove .obj file name
                pathComponents.push_back(ppmFileName); // add .ppm file name

                for (int i = 0; i < pathComponents.size(); i++) {
                    ppmPath = ppmPath + pathComponents[i];
                }
                //ppmFilePath = ppmPath;
            }
        }
        mtlFile.close();
    }
    else {
        std::cout << "Unable to open .mtl file" << std::endl;
    }
    return ppmPath;
}

// Make obj based on obj file
void Object::MakeObject(string fileName) {
    // Setup geometry based on parse in obj file
    m_geometry.ObjLoader(fileName);
    m_geometry.Gen();
    m_vertexBufferLayout.CreateNormalBufferLayout(m_geometry.GetBufferDataSize(),
        m_geometry.GetIndicesSize(),
        m_geometry.GetBufferDataPtr(),
        m_geometry.GetIndicesDataPtr());

    // Create texture based on mtl file then ppm file
    string temp = m_geometry.returnTextureFile();
    string textureName = parseMtl(temp);

    m_textureDiffuse.LoadTexture(textureName.c_str());

    // Setup shaders
    string vertexShader = m_shader.LoadShader("./shader/vert.glsl");
    string fragmentShader = m_shader.LoadShader("./shader/frag.glsl");
    // Actually create our shader
    m_shader.CreateShader(vertexShader, fragmentShader);
}

// Sphere is for creating ball shape based on texture if type is not 1
void Object::MakeSphere(string fileName, int type) {
    unsigned int latitudeBands = 30;
    unsigned int longitudeBands = 30;
    float radius = 1.0f;
    double PI = 3.14159265359;

    for (unsigned int latNumber = 0; latNumber <= latitudeBands; latNumber++) {
        float theta = latNumber * PI / latitudeBands;
        float sinTheta = sin(theta);
        float cosTheta = cos(theta);

        for (unsigned int longNumber = 0; longNumber <= longitudeBands; longNumber++) {
            float phi = longNumber * 2 * PI / longitudeBands;
            float sinPhi = sin(phi);
            float cosPhi = cos(phi);

            float x = cosPhi * sinTheta;
            float y = cosTheta;
            float z = sinPhi * sinTheta;
            // Why is this "1-" Think about the range of texture coordinates
            float u = 1 - ((float)longNumber / (float)longitudeBands);
            float v = 1 - ((float)latNumber / (float)latitudeBands);

            // Setup geometry
            m_geometry.AddVertex(radius * x, radius * y, radius * z, u, v);   // Position
        }
    }

    // Now that we have all of our vertices
    // generated, we need to generate our indices for our index element buffer.
    for (unsigned int latNumber1 = 0; latNumber1 < latitudeBands; latNumber1++) {
        for (unsigned int longNumber1 = 0; longNumber1 < longitudeBands; longNumber1++) {
            unsigned int first = (latNumber1 * (longitudeBands + 1)) + longNumber1;
            unsigned int second = first + longitudeBands + 1;
            m_geometry.AddIndex(first);
            m_geometry.AddIndex(second);
            m_geometry.AddIndex(first + 1);

            m_geometry.AddIndex(second);
            m_geometry.AddIndex(second + 1);
            m_geometry.AddIndex(first + 1);
        }
    }

    // Finally generate a simple 'array of bytes' that contains
    // everything for our buffer to work with.
    m_geometry.Gen();

    // Create a buffer and set the stride of information
    m_vertexBufferLayout.CreateNormalBufferLayout(m_geometry.GetBufferDataSize(),
        m_geometry.GetIndicesSize(),
        m_geometry.GetBufferDataPtr(),
        m_geometry.GetIndicesDataPtr());

    m_textureDiffuse.LoadTexture(fileName.c_str());

    // Set up specific shader
    string vertexShader = m_shader.LoadShader("./shader/vert.glsl");
    string fragmentShader = m_shader.LoadShader("./shader/fragMoon.glsl");
    if (type == 1) {
        fragmentShader = m_shader.LoadShader("./shader/fragLight.glsl");
    }
    // Actually create our shader
    m_shader.CreateShader(vertexShader, fragmentShader);

}

// Initialization of object as a 'quad'
//
// This could be called in the constructor or
// otherwise 'explicitly' called this
// so we create our objects at the correct time
void Object::MakeTexturedQuad(string fileName){

        // Setup geometry
        // We are using a new abstraction which allows us
        // to create triangles shapes on the fly
        // Position and Texture coordinate 
        m_geometry.AddVertex(-0.5f,-5.0f, 0.0f, 0.0f, 0.0f);
        m_geometry.AddVertex( 0.5f,-5.0f, 0.0f, 1.0f, 0.0f);
    	m_geometry.AddVertex( 0.5f, 1.0f, 0.0f, 1.0f, 1.0f);
        m_geometry.AddVertex(-0.5f, 1.0f, 0.0f, 0.0f, 1.0f);
            
        // Make our triangles and populate our
        // indices data structure	
        m_geometry.MakeTriangle(0,1,2);
        m_geometry.MakeTriangle(2,3,0);

        // This is a helper function to generate all of the geometry
        m_geometry.Gen();

        // Create a buffer and set the stride of information
        // NOTE: How we are leveraging our data structure in order to very cleanly
        //       get information into and out of our data structure.
        m_vertexBufferLayout.CreateNormalBufferLayout(m_geometry.GetBufferDataSize(),
                                        m_geometry.GetIndicesSize(),
                                        m_geometry.GetBufferDataPtr(),
                                        m_geometry.GetIndicesDataPtr());

        // Load our actual texture
        // We are using the input parameter as our texture to load
        m_textureDiffuse.LoadTexture(fileName.c_str());
        
        // Setup shaders
        string vertexShader = m_shader.LoadShader("./shader/vert.glsl");
        string fragmentShader = m_shader.LoadShader("./shader/frag.glsl");
        // Actually create our shader
        m_shader.CreateShader(vertexShader,fragmentShader);
}

void Object::MakeSkybox(string fileName) {
    // Setup geometry
    // We are using a new abstraction which allows us
    // to create triangles shapes on the fly
    // Position and Texture coordinate 
    m_geometry.AddVertex(-0.5f, -5.0f, 0.0f, 0.0f, 0.0f);
    m_geometry.AddVertex(0.5f, -5.0f, 0.0f, 1.0f, 0.0f);
    m_geometry.AddVertex(0.5f, 1.0f, 0.0f, 1.0f, 1.0f);
    m_geometry.AddVertex(-0.5f, 1.0f, 0.0f, 0.0f, 1.0f);

    // Make our triangles and populate our
    // indices data structure	
    m_geometry.MakeTriangle(0, 1, 2);
    m_geometry.MakeTriangle(2, 3, 0);

    // This is a helper function to generate all of the geometry
    m_geometry.Gen();

    // Create a buffer and set the stride of information
    // NOTE: How we are leveraging our data structure in order to very cleanly
    //       get information into and out of our data structure.
    m_vertexBufferLayout.CreateNormalBufferLayout(m_geometry.GetBufferDataSize(),
        m_geometry.GetIndicesSize(),
        m_geometry.GetBufferDataPtr(),
        m_geometry.GetIndicesDataPtr());

    // Load our actual texture
    // We are using the input parameter as our texture to load
    m_textureDiffuse.LoadTexture(fileName.c_str());

    // Setup shaders
    string vertexShader = m_shader.LoadShader("./shader/vert.glsl");
    string fragmentShader = m_shader.LoadShader("./shader/fragSky.glsl");
    // Actually create our shader
    m_shader.CreateShader(vertexShader, fragmentShader);
}

// In the future it may be good to 
// think about loading a 'default' texture
// if the user forgets to do this action!
void Object::LoadTexture(string fileName){
        // Load our actual textures
        m_textureDiffuse.LoadTexture(fileName);
}

// Bind everything we need in our object
// Generally this is called in update() and render()
// before we do any actual work with our object
void Object::Bind(){
        // Make sure we are updating the correct 'buffers'
        m_vertexBufferLayout.Bind();
        // Diffuse map is 0 by default, but it is good to set it explicitly
        m_textureDiffuse.Bind(0);
        // Select our appropriate shader
        m_shader.Bind();
}

void Object::Update(unsigned int screenWidth, unsigned int screenHeight){
        // Call our helper function to just bind everything
        Bind();
        // TODO: Read and understand
        // For our object, we apply the texture in the following way
        // Note that we set the value to 0, because we have bound
        // our texture to slot 0.
        m_shader.SetUniform1i("u_DiffuseMap",0);  
         // Here we apply the 'view' matrix which creates perspective.
        // The first argument is 'field of view'
        // Then perspective
        // Then the near and far clipping plane.
        // Note I cannot see anything closer than 0.1f units from the screen.
        // TODO: In the future this type of operation would be abstracted away
        //       in a camera class.
        m_projectionMatrix = glm::perspective(45.0f,((float)screenWidth)/((float)screenHeight),0.1f,40.0f);

        // Set the uniforms in our current shader
        // Set the MVP Matrix for our object
        // Send it into our shader
        m_shader.SetUniformMatrix4fv("model", &m_transform.GetInternalMatrix()[0][0]);
        m_shader.SetUniformMatrix4fv("view", &Camera::Instance().GetWorldToViewmatrix()[0][0]);
        m_shader.SetUniformMatrix4fv("projection", &m_projectionMatrix[0][0]);

        // Create a first 'light' for the street lamp
        m_shader.SetUniform3f("pointLights[0].lightColor", 1.0f, 0.9f, 0.0f);
        m_shader.SetUniform3f("pointLights[0].lightPos",
            Camera::Instance().GetEyeXPosition() + Camera::Instance().GetViewXDirection(),
            Camera::Instance().GetEyeYPosition() + Camera::Instance().GetViewYDirection(),
            Camera::Instance().GetEyeZPosition() + Camera::Instance().GetViewZDirection());
        m_shader.SetUniform1f("pointLights[0].ambientIntensity", 1.0f);
        m_shader.SetUniform1f("pointLights[0].specularStrength", 0.1f);
        m_shader.SetUniform1f("pointLights[0].constant", 1.0f);
        m_shader.SetUniform1f("pointLights[0].linear", 0.09f);
        m_shader.SetUniform1f("pointLights[0].quadratic", 0.032f);

        // Add additional point lights
        // Second light
        m_shader.SetUniform3f("pointLights[1].lightColor", 0.0f, 0.0f, 1.0f);
        m_shader.SetUniform3f("pointLights[1].lightPos", 2.1f, 0.96f, -1.0f);
        m_shader.SetUniform1f("pointLights[1].ambientIntensity", 0.9f);
        m_shader.SetUniform1f("pointLights[1].specularStrength", 0.5f);
        m_shader.SetUniform1f("pointLights[1].constant", 1.0f);
        m_shader.SetUniform1f("pointLights[1].linear", 0.1f);
        m_shader.SetUniform1f("pointLights[1].quadratic", 0.032f);

        m_shader.SetUniform3f("pointLights[2].lightColor", 0.2f, 0.0f, 0.9f);
        m_shader.SetUniform3f("pointLights[2].lightPos", -2.1f, 0.96f, -5.0f);
        m_shader.SetUniform1f("pointLights[2].ambientIntensity", 0.6f);
        m_shader.SetUniform1f("pointLights[2].specularStrength", 0.3f);
        m_shader.SetUniform1f("pointLights[2].constant", 1.0f);
        m_shader.SetUniform1f("pointLights[2].linear", 0.1f);
        m_shader.SetUniform1f("pointLights[2].quadratic", 0.032f);

        m_shader.SetUniform3f("pointLights[3].lightColor", 1.0f, 0.0f, 0.0f);
        m_shader.SetUniform3f("pointLights[3].lightPos", 2.1f, 0.96f, -9.0f);
        m_shader.SetUniform1f("pointLights[3].ambientIntensity", 0.5f);
        m_shader.SetUniform1f("pointLights[3].specularStrength", 0.3f);
        m_shader.SetUniform1f("pointLights[3].constant", 1.0f);
        m_shader.SetUniform1f("pointLights[3].linear", 0.1f);
        m_shader.SetUniform1f("pointLights[3].quadratic", 0.032f);

        m_shader.SetUniform3f("pointLights[4].lightColor", 0.0f, 1.0f, 0.0f);
        m_shader.SetUniform3f("pointLights[4].lightPos", -2.1f, 0.96f, -13.0f);
        m_shader.SetUniform1f("pointLights[4].ambientIntensity", 0.9f);
        m_shader.SetUniform1f("pointLights[4].specularStrength", 0.5f);
        m_shader.SetUniform1f("pointLights[4].constant", 1.0f);
        m_shader.SetUniform1f("pointLights[4].linear", 0.1f);
        m_shader.SetUniform1f("pointLights[4].quadratic", 0.032f);

        m_shader.SetUniform3f("pointLights[5].lightColor", 0.7f, 1.0f, 1.0f);
        m_shader.SetUniform3f("pointLights[5].lightPos", 2.1f, 0.96f, -17.0f);
        m_shader.SetUniform1f("pointLights[5].ambientIntensity", 0.5f);
        m_shader.SetUniform1f("pointLights[5].specularStrength", 0.5f);
        m_shader.SetUniform1f("pointLights[5].constant", 1.0f);
        m_shader.SetUniform1f("pointLights[5].linear", 0.1f);
        m_shader.SetUniform1f("pointLights[5].quadratic", 0.032f);

        m_shader.SetUniform3f("pointLights[6].lightColor", 1.0f, 0.0f, 0.0f);
        m_shader.SetUniform3f("pointLights[6].lightPos", -2.1f, 0.96f, -21.0f);
        m_shader.SetUniform1f("pointLights[6].ambientIntensity", 0.9f);
        m_shader.SetUniform1f("pointLights[6].specularStrength", 0.5f);
        m_shader.SetUniform1f("pointLights[6].constant", 1.0f);
        m_shader.SetUniform1f("pointLights[6].linear", 0.1f);
        m_shader.SetUniform1f("pointLights[6].quadratic", 0.032f);

        // For the moon
        m_shader.SetUniform3f("pointLights[7].lightColor", 1.0f, 1.0f, 1.0f);
        m_shader.SetUniform3f("pointLights[7].lightPos", -1.0f, 4.7f, -30.0f);
        m_shader.SetUniform1f("pointLights[7].ambientIntensity", 2.3f);
        m_shader.SetUniform1f("pointLights[7].specularStrength", 1.0f);
        m_shader.SetUniform1f("pointLights[7].constant", 1.0f);
        m_shader.SetUniform1f("pointLights[7].linear", 0.1f);
        m_shader.SetUniform1f("pointLights[7].quadratic", 0.032f);
        
        // For the skybox
        m_shader.SetUniform3f("pointLights[8].lightColor", 1.0f, 0.9f, 1.0f);
        m_shader.SetUniform3f("pointLights[8].lightPos",
            Camera::Instance().GetEyeXPosition() + Camera::Instance().GetViewXDirection(),
            Camera::Instance().GetEyeYPosition() + Camera::Instance().GetViewYDirection(),
            Camera::Instance().GetEyeZPosition() + Camera::Instance().GetViewZDirection());
        m_shader.SetUniform1f("pointLights[8].ambientIntensity", 10.0f);
        m_shader.SetUniform1f("pointLights[8].specularStrength", 1.0f);
        m_shader.SetUniform1f("pointLights[8].constant", 1.0f);
        m_shader.SetUniform1f("pointLights[8].linear", 0.1f);
        m_shader.SetUniform1f("pointLights[8].quadratic", 0.032f);
        /*OPTIONALLY: Create a Singleton class to manage the 'lights'
         A simple way to do this would be to create a Singleton 
         which will iterate through each of the pointlights and
        setup the uniforms for each point light.
	    (And at this point, we probably want a 'ShaderManager' class as well,
	    so we only have to do this one time per shader).*/

}

// Render our geometry
void Object::Render(){
    // Call our helper function to just bind everything
    Bind();
	//Render data
    glDrawElements(GL_TRIANGLES,
                   m_geometry.GetIndicesSize(), // The number of indicies, not triangles.
                   GL_UNSIGNED_INT,             // Make sure the data type matches
                        nullptr);               // Offset pointer to the data. 
                                                // nullptr because we are currently bound
}

// Returns the actual transform stored in our object
// which can then be modified
Transform& Object::GetTransform(){
    return m_transform; 
}
