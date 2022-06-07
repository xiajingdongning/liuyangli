import java.awt.Color;
import javax.swing.JFrame;
/**
 * This is the initial board for creating sub Jframe
 * @author Yangli Liu
 *
 */
public class Initial extends JFrame{
	
	public Initial(String title) {
		super();
		setTitle(title);
		setSize(1500, 760);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBackground(new Color(211, 211, 211));
		getContentPane().setLayout(null);
		setVisible(true);
	}
}
