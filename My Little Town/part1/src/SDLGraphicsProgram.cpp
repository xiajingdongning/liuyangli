#include "SDLGraphicsProgram.hpp"
#include "Camera.hpp"
#include "ObjectManager.hpp"

#include <iostream>
#include <string>
#include <sstream>
#include <fstream>

// Initialization function
// Returns a true or false value based on successful completion of setup.
// Takes in dimensions of window.
SDLGraphicsProgram::SDLGraphicsProgram(int w, int h):m_screenWidth(w),m_screenHeight(h){
	// Initialization flag
	bool success = true;
	// String to hold any errors that occur.
	std::stringstream errorStream;
	// The window we'll be rendering to
	m_window = NULL;
	// Render flag

	// Initialize SDL
	if(SDL_Init(SDL_INIT_VIDEO)< 0){
		errorStream << "SDL could not initialize! SDL Error: " << SDL_GetError() << "\n";
		success = false;
	}
	else{
		//Use OpenGL 3.3 core
		SDL_GL_SetAttribute( SDL_GL_CONTEXT_MAJOR_VERSION, 3 );
		SDL_GL_SetAttribute( SDL_GL_CONTEXT_MINOR_VERSION, 3 );
		SDL_GL_SetAttribute( SDL_GL_CONTEXT_PROFILE_MASK, SDL_GL_CONTEXT_PROFILE_CORE );
		// We want to request a double buffer for smooth updating.
		SDL_GL_SetAttribute(SDL_GL_DOUBLEBUFFER, 1);
		SDL_GL_SetAttribute(SDL_GL_DEPTH_SIZE, 24);

		//Create window
		m_window = SDL_CreateWindow( "Final Project",
                                SDL_WINDOWPOS_UNDEFINED,
                                SDL_WINDOWPOS_UNDEFINED,
                                m_screenWidth,
                                m_screenHeight,
                                SDL_WINDOW_OPENGL | SDL_WINDOW_SHOWN );

		// Check if Window did not create.
		if( m_window == NULL ){
			errorStream << "Window could not be created! SDL Error: " << SDL_GetError() << "\n";
			success = false;
		}

		//Create an OpenGL Graphics Context
		m_openGLContext = SDL_GL_CreateContext( m_window );
		if( m_openGLContext == NULL){
			errorStream << "OpenGL context could not be created! SDL Error: " << SDL_GetError() << "\n";
			success = false;
		}

		// Initialize GLAD Library
		if(!gladLoadGLLoader(SDL_GL_GetProcAddress)){
			errorStream << "Failed to iniitalize GLAD\n";
			success = false;
		}

		//Initialize OpenGL
		if(!InitGL()){
			errorStream << "Unable to initialize OpenGL!\n";
			success = false;
		}
  	}

    // If initialization did not work, then print out a list of errors in the constructor.
    if(!success){
        errorStream << "SDLGraphicsProgram::SDLGraphicsProgram - Failed to initialize!\n";
        std::string errors=errorStream.str();
        SDL_Log("%s\n",errors.c_str());
    }else{
        SDL_Log("SDLGraphicsProgram::SDLGraphicsProgram - No SDL, GLAD, or OpenGL, errors detected during initialization\n\n");
    }

	// SDL_LogSetAllPriority(SDL_LOG_PRIORITY_WARN); // Uncomment to enable extra debug support!
	GetOpenGLVersionInfo();

    // One more object for the floor
    Object* temp = new Object;
    temp->MakeTexturedQuad("./texture/brick.ppm");
    ObjectManager::Instance().AddObject(temp);

    Object* grass1 = new Object;
    grass1->MakeTexturedQuad("./texture/grass.ppm");
    ObjectManager::Instance().AddObject(grass1);

    Object* grass2 = new Object;
    grass2->MakeTexturedQuad("./texture/grass.ppm");
    ObjectManager::Instance().AddObject(grass2);

    Object* chapel1 = new Object;
    chapel1->MakeObject("./model/chapel_obj.obj");
    ObjectManager::Instance().AddObject(chapel1);

    Object* house1 = new Object;
    house1->MakeObject("./model/house_obj.obj");
    ObjectManager::Instance().AddObject(house1);

    Object* house2 = new Object;
    house2->MakeObject("./model/house_obj.obj");
    ObjectManager::Instance().AddObject(house2);

    Object* windmill = new Object;
    windmill->MakeObject("./model/windmill.obj");
    ObjectManager::Instance().AddObject(windmill);

    Object* chapel2 = new Object;
    chapel2->MakeObject("./model/chapel_obj.obj");
    ObjectManager::Instance().AddObject(chapel2);

    Object* house3 = new Object;
    house3->MakeObject("./model/house_obj.obj");
    ObjectManager::Instance().AddObject(house3);

    for (int i = 0; i < 6; ++i) {
        Object* light = new Object;
        light->MakeObject("./model/streetlamp.obj");
        ObjectManager::Instance().AddObject(light);
    }
    for (int i = 0; i < 6; ++i) {
        Object* lightball = new Object();
        lightball->MakeSphere("./texture/grass.ppm", 1);
        ObjectManager::Instance().AddObject(lightball);
    }

    Object* moon = new Object;
    moon->MakeSphere("./texture/rock.ppm", 2);
    ObjectManager::Instance().AddObject(moon);

    Object* background1 = new Object;
    background1->MakeSkybox("./texture/front.ppm");
    ObjectManager::Instance().AddObject(background1);

    Object* background2 = new Object;
    background2->MakeSkybox("./texture/star.ppm");
    ObjectManager::Instance().AddObject(background2);

    Object* background3 = new Object;
    background3->MakeSkybox("./texture/star02.ppm");
    ObjectManager::Instance().AddObject(background3);
}


// Proper shutdown of SDL and destroy initialized objects
SDLGraphicsProgram::~SDLGraphicsProgram(){
    // Reclaim all of our objects
    ObjectManager::Instance().RemoveAll();

    //Destroy window
	SDL_DestroyWindow( m_window );
	// Point m_window to NULL to ensure it points to nothing.
	m_window = nullptr;
	//Quit SDL subsystems
	SDL_Quit();
}


// Initialize OpenGL
// Setup any of our shaders here.
bool SDLGraphicsProgram::InitGL(){
	//Success flag
	bool success = true;

	return success;
}


// Update OpenGL
void SDLGraphicsProgram::Update(){

    // Here we hard-code a giant scene
   
    ObjectManager::Instance().GetObject(0).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(0).GetTransform().Translate(0.0f, -0.5f, -4.0f);
    ObjectManager::Instance().GetObject(0).GetTransform().Scale(4.0f, 4.0f, 5.0f);
    ObjectManager::Instance().GetObject(0).GetTransform().Rotate(glm::radians(90.0f), 1.0f, 0.0f, 0.0f);

    ObjectManager::Instance().GetObject(1).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(1).GetTransform().Translate(-4.5f, -0.5f, -4.0f);
    ObjectManager::Instance().GetObject(1).GetTransform().Scale(5.0f, 5.0f, 5.0f);
    ObjectManager::Instance().GetObject(1).GetTransform().Rotate(glm::radians(90.0f), 1.0f, 0.0f, 0.0f);

    ObjectManager::Instance().GetObject(2).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(2).GetTransform().Translate(4.5f, -0.5f, -4.0f);
    ObjectManager::Instance().GetObject(2).GetTransform().Scale(5.0f, 5.0f, 5.0f);
    ObjectManager::Instance().GetObject(2).GetTransform().Rotate(glm::radians(90.0f), 1.0f, 0.0f, 0.0f);

    ObjectManager::Instance().GetObject(3).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(3).GetTransform().Translate(0.0f, 0.66f, -25.0f);

    ObjectManager::Instance().GetObject(4).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(4).GetTransform().Translate(-2.5f, 0.115f, -2.0f);
    ObjectManager::Instance().GetObject(4).GetTransform().Rotate(glm::radians(90.0f), 0.0f, 1.0f, 0.0f);

    ObjectManager::Instance().GetObject(5).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(5).GetTransform().Translate(4.835f, 0.72f, -14.0f);
    ObjectManager::Instance().GetObject(5).GetTransform().Scale(2.0f, 2.0f, 2.0f);
    ObjectManager::Instance().GetObject(5).GetTransform().Rotate(glm::radians(90.0f), 0.0f, -1.0f, 0.0f);

    ObjectManager::Instance().GetObject(6).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(6).GetTransform().Translate(-4.8f, 1.85f, -20.0f);
    ObjectManager::Instance().GetObject(6).GetTransform().Scale(1.3f, 1.5f, 1.5f);
    ObjectManager::Instance().GetObject(6).GetTransform().Rotate(glm::radians(90.0f), 0.0f, 1.0f, 0.0f);

    ObjectManager::Instance().GetObject(7).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(7).GetTransform().Translate(-3.22f, 0.66f, -8.0f);
    ObjectManager::Instance().GetObject(7).GetTransform().Rotate(glm::radians(90.0f), 0.0f, -1.0f, 0.0f);

    ObjectManager::Instance().GetObject(8).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(8).GetTransform().Translate(3.36f, 0.25f, -2.2f);
    ObjectManager::Instance().GetObject(8).GetTransform().Scale(1.2f, 1.2f, 1.2f);
    ObjectManager::Instance().GetObject(8).GetTransform().Rotate(glm::radians(90.0f), 0.0f, 3.0f, 0.0f);

    ObjectManager::Instance().GetObject(9).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(9).GetTransform().Translate(2.38f, -0.5f, -1.0f);
    ObjectManager::Instance().GetObject(9).GetTransform().Scale(0.15f, 0.15f, 0.15f);

    ObjectManager::Instance().GetObject(10).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(10).GetTransform().Translate(-1.8f, -0.5f, -5.0f);
    ObjectManager::Instance().GetObject(10).GetTransform().Scale(0.15f, 0.15f, 0.15f);

    ObjectManager::Instance().GetObject(11).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(11).GetTransform().Translate(2.38f, -0.5f, -9.0f);
    ObjectManager::Instance().GetObject(11).GetTransform().Scale(0.15f, 0.15f, 0.15f);

    ObjectManager::Instance().GetObject(12).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(12).GetTransform().Translate(-1.8f, -0.5f, -13.0f);
    ObjectManager::Instance().GetObject(12).GetTransform().Scale(0.15f, 0.15f, 0.15f);

    ObjectManager::Instance().GetObject(13).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(13).GetTransform().Translate(2.38f, -0.5f, -17.0f);
    ObjectManager::Instance().GetObject(13).GetTransform().Scale(0.15f, 0.15f, 0.15f);

    ObjectManager::Instance().GetObject(14).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(14).GetTransform().Translate(-1.8f, -0.5f, -21.0f);
    ObjectManager::Instance().GetObject(14).GetTransform().Scale(0.15f, 0.15f, 0.15f);

    ObjectManager::Instance().GetObject(15).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(15).GetTransform().Translate(2.1f, 0.96f, -1.0f);
    ObjectManager::Instance().GetObject(15).GetTransform().Scale(0.06f, 0.06f, 0.06f);

    ObjectManager::Instance().GetObject(16).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(16).GetTransform().Translate(-2.1f, 0.96f, -5.0f);
    ObjectManager::Instance().GetObject(16).GetTransform().Scale(0.06f, 0.06f, 0.06f);

    ObjectManager::Instance().GetObject(17).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(17).GetTransform().Translate(2.1f, 0.96f, -9.0f);
    ObjectManager::Instance().GetObject(17).GetTransform().Scale(0.06f, 0.06f, 0.06f);

    ObjectManager::Instance().GetObject(18).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(18).GetTransform().Translate(-2.1f, 0.96f, -13.0f);
    ObjectManager::Instance().GetObject(18).GetTransform().Scale(0.06f, 0.06f, 0.06f);

    ObjectManager::Instance().GetObject(19).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(19).GetTransform().Translate(2.1f, 0.96f, -17.0f);
    ObjectManager::Instance().GetObject(19).GetTransform().Scale(0.06f, 0.06f, 0.06f);

    ObjectManager::Instance().GetObject(20).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(20).GetTransform().Translate(-2.1f, 0.96f, -21.0f);
    ObjectManager::Instance().GetObject(20).GetTransform().Scale(0.06f, 0.06f, 0.06f);

    ObjectManager::Instance().GetObject(21).GetTransform().LoadIdentity();
    static float move = 0;
    move += 0.005;
    ObjectManager::Instance().GetObject(21).GetTransform().Translate(-6.7f + move, 2.7f + (move / 7.0f), -30.0f);
    if (move > 13) { move = 0; }
    static float rot = 0;
    rot += 0.007;
    if (rot > 360) { rot = 0; }
    ObjectManager::Instance().GetObject(21).GetTransform().Rotate(rot, 0.0f, 1.0f, 0.0f);

    ObjectManager::Instance().GetObject(22).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(22).GetTransform().Translate(0.0f, 14.3f, -30.0f);
    ObjectManager::Instance().GetObject(22).GetTransform().Scale(14.0f, 3.1f, 1.0f);

    ObjectManager::Instance().GetObject(23).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(23).GetTransform().Translate(7.0f, 14.5f, -14.5f);
    ObjectManager::Instance().GetObject(23).GetTransform().Scale(1.0f, 3.0f, 31.0f);
    ObjectManager::Instance().GetObject(23).GetTransform().Rotate(glm::radians(90.0f), 0.0f, 1.0f, 0.0f);

    ObjectManager::Instance().GetObject(24).GetTransform().LoadIdentity();
    ObjectManager::Instance().GetObject(24).GetTransform().Translate(-7.0f, 14.5f, -14.5f);
    ObjectManager::Instance().GetObject(24).GetTransform().Scale(1.0f, 3.0f, 31.0f);
    ObjectManager::Instance().GetObject(24).GetTransform().Rotate(glm::radians(90.0f), 0.0f, 3.0f, 0.0f);

    // Update all of the objects
    ObjectManager::Instance().UpdateAll(m_screenWidth,m_screenHeight);
}



// Render
// The render function gets called once per loop
void SDLGraphicsProgram::Render(){
	// Setup our OpenGL State machine
    // TODO: Read this
    // The below command is new!
    // What we are doing, is telling opengl to create a depth(or Z-buffer) 
    // for us that is stored every frame.
    glEnable(GL_DEPTH_TEST);
    glEnable(GL_TEXTURE_2D); 

    // Initialize clear color
    // This is the background of the screen.
    glViewport(0, 0, m_screenWidth, m_screenHeight);
    glClearColor( 0.0f, 0.0f, 0.1f, 1.f );
    // TODO: Read this
    // Clear color buffer and Depth Buffer
    // Remember that the 'depth buffer' is our
    // z-buffer that figures out how far away items are every frame
    // and we have to do this every frame!
  	glClear(GL_DEPTH_BUFFER_BIT | GL_COLOR_BUFFER_BIT);

    // Nice way to debug your scene in wireframe!
    //glPolygonMode(GL_FRONT_AND_BACK,GL_LINE);

    // Render all of our objects in a simple loop
    ObjectManager::Instance().RenderAll();
 
	// Delay to slow things down just a bit!
    SDL_Delay(50); 
}


//Loops forever!
void SDLGraphicsProgram::Loop(){
    // Main loop flag
    // If this is quit = 'true' then the program terminates.
    bool quit = false;
    // Event handler that handles various events in SDL
    // that are related to input and output
    SDL_Event e;
    // Enable text input
    SDL_StartTextInput();

    // Set the camera speed for how fast we move.
    float cameraSpeed = 0.05f;

    // While application is running
    while(!quit){
     	     	 //Handle events on queue
		while(SDL_PollEvent( &e ) != 0){
        	// User posts an event to quit
	        // An example is hitting the "x" in the corner of the window.
    	    if(e.type == SDL_QUIT){
        		quit = true;
	        }
            // Handle keyboad input for the camera class
            /*if (e.type == SDL_MOUSEMOTION) {
                // Handle mouse movements
                int mouseX = e.motion.x;
                int mouseY = e.motion.y;
                Camera::Instance().MouseLook(mouseX, mouseY);
            }*/
            switch(e.type){
                // Handle keyboard presses
                case SDL_KEYDOWN:
                    switch(e.key.keysym.sym){
                        case SDLK_w:
                            glPolygonMode(GL_FRONT_AND_BACK, GL_LINE);
                            break;
                        case SDLK_LEFT:
                            Camera::Instance().MoveLeft(cameraSpeed);
                            break;
                        case SDLK_RIGHT:
                            Camera::Instance().MoveRight(cameraSpeed);
                            break;
                        case SDLK_UP:
                            Camera::Instance().MoveForward(cameraSpeed);
                            break;
                        case SDLK_DOWN:
                            Camera::Instance().MoveBackward(cameraSpeed);
                            break;
                        case SDLK_RSHIFT:
                            Camera::Instance().MoveUp(cameraSpeed);
                            break;
                        case SDLK_RCTRL:
                            Camera::Instance().MoveDown(cameraSpeed);
                            break;
                    }
                break;
            }
      	} // End SDL_PollEvent loop.
		
		// Update our scene
		Update();
		// Render using OpenGL
	    Render(); 	// TODO: potentially move this depending on your logic
					// for how you handle drawing a triangle or rectangle.
      	//Update screen of our specified window
      	SDL_GL_SwapWindow(GetSDLWindow());
	}
    //Disable text input
    SDL_StopTextInput();
}


// Get Pointer to Window
SDL_Window* SDLGraphicsProgram::GetSDLWindow(){
  return m_window;
}

// Helper Function to get OpenGL Version Information
void SDLGraphicsProgram::GetOpenGLVersionInfo(){
	SDL_Log("(Note: If you have two GPU's, make sure the correct one is selected)");
	SDL_Log("Vendor: %s",(const char*)glGetString(GL_VENDOR));
	SDL_Log("Renderer: %s",(const char*)glGetString(GL_RENDERER));
	SDL_Log("Version: %s",(const char*)glGetString(GL_VERSION));
	SDL_Log("Shading language: %s",(const char*)glGetString(GL_SHADING_LANGUAGE_VERSION));
}
