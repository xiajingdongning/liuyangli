/**
 * This is the 3D gallery space using Java3D API
 */
import java.applet.*;
    import java.awt.*;

    import javax.media.j3d.*;
import javax.swing.JFrame;
import javax.vecmath.*;

    import com.sun.j3d.utils.applet.MainFrame;
    import com.sun.j3d.utils.universe.SimpleUniverse;
    import com.sun.j3d.utils.universe.PlatformGeometry;
    import com.sun.j3d.utils.behaviors.keyboard.*;

    import com.sun.j3d.loaders.Scene;

    import com.sun.j3d.loaders.objectfile.ObjectFile;

    import java.io.*;

    import java.awt.event.KeyListener;
import java.awt.event.WindowEvent;
import java.awt.event.KeyEvent;
    import java.awt.Graphics;
    import java.applet.Applet;
//Originally based on code from BackgroundApp.java(1996-2000 Sun Microsystems, Inc.) and Kankarollo's online post 
    public class Gallery extends Applet implements KeyListener {

     private SimpleUniverse universe = null;
     private Canvas3D canvas = null;
     private TransformGroup viewtrans = null;

     private TransformGroup tg = null;
     private Transform3D t3d = null;
     private Transform3D t3dstep = new Transform3D();
     private Matrix4d matrix = new Matrix4d();
     

     public Gallery() {
      setLayout(new BorderLayout());
      GraphicsConfiguration config = SimpleUniverse
        .getPreferredConfiguration();

      canvas = new Canvas3D(config);
      add("Center", canvas);
      universe = new SimpleUniverse(canvas);

      BranchGroup scene = createSceneGraph();
      universe.getViewingPlatform().setNominalViewingTransform();

      universe.getViewer().getView().setBackClipDistance(100.0);

      canvas.addKeyListener(this);

      universe.addBranchGraph(scene);
     }

     private BranchGroup createSceneGraph() {
      BranchGroup objRoot = new BranchGroup();

      BoundingSphere bounds = new BoundingSphere(new Point3d(), 10000.0);

      viewtrans = universe.getViewingPlatform().getViewPlatformTransform();

      KeyNavigatorBehavior gallery = new KeyNavigatorBehavior(viewtrans);
      gallery.setSchedulingBounds(bounds);
      PlatformGeometry platformGeom = new PlatformGeometry();
      platformGeom.addChild(gallery);
      universe.getViewingPlatform().setPlatformGeometry(platformGeom);

      objRoot.addChild(createWall());

      Background background = new Background();
      background.setColor(0.6f, 0.46f, 0.78f);
      background.setApplicationBounds(bounds);
      objRoot.addChild(background);

      return objRoot;
     }

     private BranchGroup createWall() {

      BranchGroup objRoot = new BranchGroup();
      tg = new TransformGroup();
      t3d = new Transform3D();

      tg.setCapability(TransformGroup.ALLOW_TRANSFORM_WRITE);
      t3d.setTranslation(new Vector3d(0.5, 0.15, -6.0));
      t3d.setRotation(new AxisAngle4f(0.0f, 0.0f, 0.0f, 0.0f));
      t3d.setScale(1.5);

      tg.setTransform(t3d);
      
     
      ObjectFile loader = new ObjectFile(ObjectFile.RESIZE);
      Scene s = null;

      File file = new File("gallery.obj");

      try {
       s = loader.load(file.toURI().toURL());
      } catch (Exception e) {
       System.err.println(e);
       System.exit(1);
      }

      tg.addChild(s.getSceneGroup());

      objRoot.addChild(tg);
      objRoot.addChild(createLight());

      objRoot.compile();

      return objRoot;

     }

     private Light createLight() {
      DirectionalLight light = new DirectionalLight(true, new Color3f(1.0f,
        1.0f, 1.0f), new Vector3f(-0.3f, 0.2f, -1.0f));

      light.setInfluencingBounds(new BoundingSphere(new Point3d(), 10000.0));

      return light;
     }
     
     public void keyTyped(KeyEvent e) {
      char key = e.getKeyChar();


      if (key == 'd') {
       t3dstep.set(new Vector3d(0.0, 0.0, -0.1));
       tg.getTransform(t3d);
       t3d.mul(t3dstep);
       tg.setTransform(t3d);
      }
      
      if (key == 's') {
       t3dstep.rotY(Math.PI / 32);
       tg.getTransform(t3d);
       t3d.get(matrix);
       t3d.setTranslation(new Vector3d(0.0, 0.0, 0.0));
       t3d.mul(t3dstep);
       t3d.setTranslation(new Vector3d(matrix.m03, matrix.m13, matrix.m23));
       tg.setTransform(t3d);
      }

      if (key == 'f') {
       t3dstep.rotY(-Math.PI / 32);
       tg.getTransform(t3d);
       t3d.get(matrix);
       t3d.setTranslation(new Vector3d(0.0, 0.0, 0.0));
       t3d.mul(t3dstep);
       t3d.setTranslation(new Vector3d(matrix.m03, matrix.m13, matrix.m23));
       tg.setTransform(t3d);
      }

      if (key == 'r') {
       t3dstep.rotX(Math.PI / 32);
       tg.getTransform(t3d);
       t3d.get(matrix);
       t3d.setTranslation(new Vector3d(0.0, 0.0, 0.0));
       t3d.mul(t3dstep);
       t3d.setTranslation(new Vector3d(matrix.m03, matrix.m13, matrix.m23));
       tg.setTransform(t3d);
      }

      if (key == 'v') {
       t3dstep.rotX(-Math.PI / 32);
       tg.getTransform(t3d);
       t3d.get(matrix);
       t3d.setTranslation(new Vector3d(0.0, 0.0, 0.0));
       t3d.mul(t3dstep);
       t3d.setTranslation(new Vector3d(matrix.m03, matrix.m13, matrix.m23));
       tg.setTransform(t3d);
      }

      if (key == 'e') {
       t3dstep.set(new Vector3d(0.0, 0.1, 0.0));
       tg.getTransform(t3d);
       t3d.mul(t3dstep);
       tg.setTransform(t3d);
      }

      if (key == 'c') {
       t3dstep.set(new Vector3d(0.0, -0.1, 0.0));
       tg.getTransform(t3d);
       t3d.mul(t3dstep);
       tg.setTransform(t3d);
      }
      //press q to exit
      if (key == 'q') {
    	  System.exit(0);
      }
      //press b to go back to main menu
      if (key == 'b') {
    	  this.setVisible(false);
    	  this.setSize(0,0);
    	  ApplicationDriver a = new ApplicationDriver();
    	  a.mainMenu(a);
      }
     }

     public void keyReleased(KeyEvent e) {
     }

     public void keyPressed(KeyEvent e) {
     }
 	
   }
