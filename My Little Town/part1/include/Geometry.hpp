/** @file Geometry.hpp
 *  @brief Organizes vertex and triangle information.
 *  
 *  More...
 *
 *  @author Mike
 *  @bug No known bugs.
 */

#ifndef GEOMETRY_HPP
#define GEOMETRY_HPP

#include <vector>
#include <iostream>
#include <sstream>
#include <fstream>

// Purpose of this class is to store vertice and triangle information
class Geometry{
public:
	// Constructor
	Geometry();
	// Destructor
	~Geometry();
	// Loading obj file
	void ObjLoader(const std::string fileName);
	// Return the texture
	std::string returnTextureFile();

	// Functions for working with individual vertices
	unsigned int GetBufferSizeInBytes();
    // Retrieve the 
	unsigned int GetBufferDataSize();
    // Retrieve the Buffer Data Size
	float* GetBufferDataPtr();
	// Add a new vertex 
	void AddVertex(float x, float y, float z, float s, float t);
	// Allows for adding one index at a time manually if 
	// you know which vertices are needed to make a triangle.
	void AddIndex(unsigned int i);
    // gen pushes all attributes into a single vector
	void Gen();
	// Functions for working with Indices
	// Creates a triangle from 3 indicies
	// When a triangle is made, the tangents and bi-tangents are also
	// computed
	void MakeTriangle(unsigned int vert0, unsigned int vert1, unsigned int vert2);  
    // Retrieve how many indicies there are
	unsigned int GetIndicesSize();
    // Retrieve the pointer to the indices
	unsigned int* GetIndicesDataPtr();

private:
	// m_bufferData stores all of the vertexPositons, coordinates, normals, etc.
	// This is all of the information that should be sent to the vertex Buffer Object
	std::vector<float> m_bufferData;

    // Individual components of 
	std::vector<float> m_vertexPositions;
	std::vector<float> m_textureCoords;
	std::vector<float> m_normals;
	std::vector<float> m_tangents;
	std::vector<float> m_biTangents;

	// The indices for a indexed-triangle mesh
	std::vector<unsigned int> m_indices;
	std::vector<unsigned int> p_indices;
	std::vector<unsigned int> t_indices;
	std::vector<unsigned int> n_indices;

	struct VertexData {
		float x, y, z;
	};
	struct TextureData {
		float u, v;
	};
	struct NormalData {
		float dx, dy, dz;
	};

	std::vector<VertexData> temp_positions;
	std::vector<TextureData> temp_textures;
	std::vector<NormalData> temp_normals;

	std::string textureFile;
};





#endif
