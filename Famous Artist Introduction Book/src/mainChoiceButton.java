import java.awt.Image;

import javax.swing.ImageIcon;
import javax.swing.JButton;
/**
 * This is the custom button class for loading image button
 * @author Yangli Liu
 *
 */
public class mainChoiceButton extends JButton{

	public mainChoiceButton(String name, int posxDifference) {
		super();
		Image img = new ImageIcon(this.getClass().getResource(name)).getImage();
		setIcon(new ImageIcon(img));
		setBounds(50+posxDifference, 600, 180, 35);
	}

}
