/** @file Object.hpp
 *  @brief Sets up an OpenGL camera..
 *  
 *  More...
 *
 *  @author Mike
 *  @bug No known bugs.
 */
#ifndef OBJECT_HPP
#define OBJECT_HPP

#include <glad/glad.h>

#include <vector>
#include <string>

#include "Shader.hpp"
#include "VertexBufferLayout.hpp"
#include "Texture.hpp"
#include "Transform.hpp"
#include "Geometry.hpp"

#include "glm/vec3.hpp"
#include "glm/gtc/matrix_transform.hpp"

// Purpose:
// An abstraction to create multiple objects
//
//
class Object{
public:
    // Object Constructor
    Object();
    // Object destructor
    ~Object();
    // Load a texture
    void LoadTexture(std::string fileName);
    // Create an object based on Geometry
    void MakeObject(std::string fileName);
    // Create an lightball based on shader name
    void MakeSphere(std::string fileName, int type);
    // Return texture file name
    std::string parseMtl(std::string path);
    // Create a textured quad
    void MakeTexturedQuad(std::string fileName);
    // Create environment map
    void MakeSkybox(std::string fileName);
    // Updates and transformations applied to object
    void Update(unsigned int screenWidth, unsigned int screenHeight);
    // How to draw the object
    void Render();
    // Returns an objects transform
    Transform& GetTransform();

    
private:
	// Helper method for when we are ready to draw or update our object
	void Bind();

    // Object vertices
    std::vector<GLfloat> m_vertices;
    // Object indicies
    std::vector<GLuint> m_indices;

    // For now we have one shader per object.
    Shader m_shader;
    // For now we have one buffer per object.
    VertexBufferLayout m_vertexBufferLayout;
    // For now we have one texture per object
    Texture m_textureDiffuse;
    // Store the objects transformations
    Transform m_transform; 
    // Store the 'camera' projection
    glm::mat4 m_projectionMatrix;
    // Store the objects Geometry
	Geometry m_geometry;

};


#endif
