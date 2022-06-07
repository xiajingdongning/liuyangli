import java.awt.Color;
import java.awt.Desktop;
import java.awt.Font;
import java.awt.SystemColor;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.File;
import java.net.URL;

import javax.print.attribute.standard.Media;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JRadioButton;
import javax.swing.JTextPane;
import javax.swing.SwingConstants;
import javax.swing.Timer;


public class Rembrandt04 extends JFrame implements setSoundTrack02{
	
	
	
	public Rembrandt04() {
		Initial j4 = new Initial("Rembrandt Harmenszoon van Rijn");
		music vs = this.set();
		
		JLabel vs10 = new image(30, 15, 798, 601,"/02_10.png");
		j4.getContentPane().add(vs10);
		vs10.setVisible(true);
		
		JTextPane txt9 = new text01(850, 22, 600, 580,"The Anatomy Lesson of Dr. "
				+ "Nicolaes Tulp is a 1632 oil painting on canvas by Rembrandt housed in the Mauritshuis museum in The Hague, "
				+ "the Netherlands. The painting is regarded as one of Rembrandt's early masterpieces.\r\n"
				+ "\r\n"
				+ "In the work, Nicolaes Tulp is pictured explaining the musculature of the arm to a group of doctors. "
				+ "Some of the spectators are various doctors who paid commissions to be included in the painting. "
				+ "The painting is signed in the top-left hand corner Rembrandt. f[ecit] 1632. "
				+ "This may be the first instance of Rembrandt signing a painting with his forename "
				+ "(in its original form) as opposed to the monogram RHL (Rembrandt Harmenszoon of Leiden), "
				+ "and is thus a sign of his growing artistic confidence.\r\n"
				+ "\nAnatomy lessons were a social event in the 17th century, taking place in lecture rooms that were actual theatres, "
				+ "with students, colleagues and the general public being permitted to attend on payment of an entrance fee. "
				+ "The spectators are appropriately dressed for this social occasion. It is thought that the uppermost "
				+ "(not holding the paper) and farthest left figures were added to the picture later.\r\n"
				+ "\r\n"
				+ "Every five to ten years, the Surgeon's Guild would commission a portrait by a leading portraitist "
				+ "of the period; Rembrandt was commissioned for this task when he was 26 years old, and newly arrived in Amsterdam. "
				+ "It was his first major commission in Amsterdam. Each of the men included in the portrait would have paid "
				+ "a certain amount of money to be included in the work, and the more central figures (in this case, Tulp) "
				+ "probably paid more, even twice as much. Rembrandt's anatomical portrait radically altered the conventions of "
				+ "the genre, by including a full-length corpse in the center of the image (using Christ-like iconography) and "
				+ "creating not just a portrait but a dramatic mise-en-scène. Rembrandt's image is a fiction; in a typical anatomy lesson, "
				+ "the surgeon would begin by opening the chest cavity and thorax because the internal organs there decay most rapidly."
				+ "",2,16);
		j4.getContentPane().add(txt9);
		txt9.setVisible(true);
		
		JRadioButton watch = new JRadioButton("Go to watch extra video");
		watch.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if(vs.isPlay()) {
					vs.stopPlay();
				}
				try {
					Desktop.getDesktop().browse(new URL("https://www.youtube.com/embed/X-yR2VUkcI8?start=1&fs=1").toURI());
				}
				catch(Exception E){
					System.out.println("Error occur.");
				}
				
			}
		});
		watch.setHorizontalAlignment(SwingConstants.CENTER);
		watch.setBackground(Color.WHITE);
		watch.setForeground(Color.BLACK);
		watch.setFont(new Font("Georgia", Font.BOLD | Font.ITALIC, 15));
		watch.setEnabled(false);
		watch.setBounds(640, 630, 220, 35);
		j4.getContentPane().add(watch);
		
		JButton stop = new homeButton("Back to Home");
		stop.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if(vs.isPlay()) {
					vs.stopPlay();
				}
				j4.dispose();
				ApplicationDriver a = new ApplicationDriver();
				a.mainMenu(a);
			}
		});
		j4.getContentPane().add(stop);
		
		JButton gallery = new nextButton("3D Gallery");
	    gallery.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if(vs.isPlay()) {
					vs.stopPlay();
				}
				j4.dispose();
				new Instruction();
			}
		});
	    j4.getContentPane().add(gallery);
	    gallery.setVisible(true);
	}
	
	

}
