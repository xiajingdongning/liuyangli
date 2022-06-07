import java.awt.Image;
import javax.swing.ImageIcon;
import javax.swing.JLabel;
/**
 * This is the custom image class
 * @author Yangli Liu
 *
 */
public class image extends JLabel{
	
	public image(int posx, int posy, int width, int highth, String image) {
		super();
		Image img = new ImageIcon(this.getClass().getResource(image)).getImage();
		setIcon(new ImageIcon(img));
		setBounds(posx, posy, width, highth);
	}
}
