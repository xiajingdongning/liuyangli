import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextPane;

public class Rembrandt02 extends JFrame implements setSoundTrack02{
	public Rembrandt02() {
		Initial j2 = new Initial("Rembrandt Harmenszoon van Rijn");
		music vs = this.set();
		
		JTextPane txt3 = new text01(20, 545, 400, 130,"Rembrandt's portraits of his contemporaries, self-portraits and "
				+ "illustrations of scenes from the Bible are regarded as his greatest creative triumphs. "
				+ "His self-portraits form a unique and intimate autobiography, in which the artist surveyed himself "
				+ "without vanity and with the utmost sincerity.",1,17);
		j2.getContentPane().add(txt3);
		txt3.setVisible(true);
		
		JTextPane txt4 = new text01(440, 452, 502, 210,"Among the more prominent characteristics of Rembrandt's work are his use of chiaroscuro, "
				+ "the theatrical employment of light and shadow derived from Caravaggio, or, more likely, from the Dutch Caravaggisti, "
				+ "but adapted for very personal means.\n\nStylistically, his paintings progressed from the early \"smooth\" manner, "
				+ "characterized by fine technique in the portrayal of illusionistic form, to the late \"rough\" treatment of richly "
				+ "variegated paint surfaces, which allowed for an illusionism of form suggested by the tactile quality of the paint itself.",1,17);
		j2.getContentPane().add(txt4);
		txt4.setVisible(true);
		
		JTextPane txt5 = new text01(960, 385, 502, 290,"Rembrandt's foremost contribution in the history of printmaking was his transformation "
				+ "of the etching process from a relatively new reproductive technique into a true art form, along with Jacques Callot. "
				+ "His reputation as the greatest etcher in the history of the medium was established in his lifetime and never questioned since."
				+ " Few of his paintings left the Dutch Republic while he lived, but his prints were circulated throughout Europe, "
				+ "and his wider reputation was initially based on them alone."
				+ "\nIn his works he exhibited knowledge of classical iconography, "
				+ "which he molded to fit the requirements of his own experience; "
				+ "thus, the depiction of a biblical scene was informed by Rembrandt's knowledge of the specific text, "
				+ "his assimilation of classical composition, and his observations of Amsterdam's Jewish population.",1,17);
		j2.getContentPane().add(txt5);
		txt5.setVisible(true);
		
		JLabel vs4 = new image(20, 20, 400, 510,"/02_04.png");
		j2.getContentPane().add(vs4);
		vs4.setVisible(true);
		
		JLabel vs5 = new image(440, 40, 502, 400,"/02_05.jpg");
		j2.getContentPane().add(vs5);
		vs5.setVisible(true);
		
		JLabel vs6 = new image(960, 40, 500, 333,"/02_06.png");
		j2.getContentPane().add(vs6);
		vs6.setVisible(true);
		
		JButton stop = new homeButton("Back to Home");
		stop.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if(vs.isPlay()) {
					vs.stopPlay();
				}
				j2.dispose();
				ApplicationDriver a = new ApplicationDriver();
				a.mainMenu(a);
			}
		});
		j2.getContentPane().add(stop);
		
		JButton nc = new nextButton("Next Chapter");
		nc.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				j2.dispose();
				new Rembrandt03();
			}
		});
		j2.getContentPane().add(nc);
	}

}
