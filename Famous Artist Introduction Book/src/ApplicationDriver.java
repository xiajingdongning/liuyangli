import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JButton;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import javax.swing.JTextPane;
import java.awt.SystemColor;
import java.awt.Color;
import java.awt.Font;

/**
 * This is the application driver, the main menu GUI
 * @author Yangli Liu
 *
 */
public class ApplicationDriver extends JFrame {
	
	public ApplicationDriver() {
		getContentPane().setFont(new Font("Arial Black", Font.BOLD, 12));
		getContentPane().setBackground(new Color(211, 211, 211));
		getContentPane().setLayout(null);
		
		
		JButton vb = new mainChoiceButton("/01.png", 0);
		vb.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				new DaVinci01();
				dispose();
			}
		});
		getContentPane().add(vb);
		vb.setVisible(false);
		
		JButton rb = new mainChoiceButton("/02.png", 300);
		rb.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				new Rembrandt01();
				dispose();
			}
		});
		getContentPane().add(rb);
		rb.setVisible(false);
		
		JButton gb = new mainChoiceButton("/03.png", 600);
		gb.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				new VanGogh01();
				dispose();
			}
		});
		getContentPane().add(gb);
		gb.setVisible(false);
		
		JButton mb = new mainChoiceButton("/04.png", 900);
		mb.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				new Monet01();
				dispose();
			}
		});
		getContentPane().add(mb);
		mb.setVisible(false);
		
		JButton pb = new mainChoiceButton("/05.png", 1200);
		pb.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				new Picasso01();
				dispose();
			}
		});
		getContentPane().add(pb);
		pb.setVisible(false);
		
		JTextPane txt = new text01(1190, 700, 335, 15,"©All images, most contents originate from the internet.",2,10);
		txt.setForeground(SystemColor.desktop);
		txt.setBackground(new Color(211, 211, 211));
		getContentPane().add(txt);
		txt.setVisible(true);
		
		JButton btnStartButton = new JButton("Welcome to Your Jounry");
		btnStartButton.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				btnStartButton.setVisible(false);
				vb.setVisible(true);
				rb.setVisible(true);
				gb.setVisible(true);
				mb.setVisible(true);
				pb.setVisible(true);
				txt.setVisible(false);
				
			}
		});
		btnStartButton.setBackground(SystemColor.desktop);
		btnStartButton.setForeground(new Color(255, 255, 255));
		btnStartButton.setFont(new Font("Georgia", Font.BOLD | Font.ITALIC, 16));
		btnStartButton.setBounds(625, 600, 250, 50);
		getContentPane().add(btnStartButton);
		
		JLabel lblNewLabel = new image(0, 10, 1490, 600,"/Title Screen.png");
		getContentPane().add(lblNewLabel);
	}
	//Main menu method for creating hierarchy loop
	public void mainMenu(ApplicationDriver a) {
		a = new ApplicationDriver();
		a.setTitle("Artist Introduction Book");
		a.setSize(1500, 760);
		a.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		a.setVisible(true);	
	}
	
	public static void main(String[] args) {
		ApplicationDriver a = new ApplicationDriver();
		a.mainMenu(a);
	}
}
