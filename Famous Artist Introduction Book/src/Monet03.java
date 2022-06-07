import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextPane;

public class Monet03 extends JFrame implements setSoundTrack04{
	public Monet03() {
		Initial j3 = new Initial("Claude Monet");
		music vs = this.set();
		
		JLabel vs7 = new image(10, 60, 512, 383,"/04_07.png");
		j3.getContentPane().add(vs7);
		vs7.setVisible(true);
		
		JLabel vs8 = new image(530, 90, 420, 327,"/04_08.jpg");
		j3.getContentPane().add(vs8);
		vs8.setVisible(true);
		
		JLabel vs9 = new image(960, 60, 512, 384,"/04_09.png");
		j3.getContentPane().add(vs9);
		vs9.setVisible(true);
		
		JTextPane txt6 = new text01(10, 470, 512, 180,"Bain à la Grenouillère is an 1869 painting by Claude Monet. "
				+ "(Oil on canvas, 74.6 cm x 99.7 cm). It depicts \"Flowerpot Island\", also known as the Camembert, "
				+ "and the gangplank to La Grenouillère, a floating restaurant and boat-hire on the Seine at Croissy-sur-Seine. "
				+ "\nMonet wrote on September 25, 1869 in a letter to fellow artist Frédéric Bazille, \"I do have a dream, a painting (tableau), "
				+ "the baths of La Grenouillère, for which I have made some bad sketches (pochades), but it is only a dream.” "
				+ "The painting here are probably the sketches mentioned by Monet in his letter.",1,16);
		j3.getContentPane().add(txt6);
		txt6.setVisible(true);
		
		JTextPane txt7 = new text01(530, 470, 420, 170,"Impression, Sunrise is a painting by Claude Monet first shown at what would "
				+ "become known as the \"Exhibition of the Impressionists\" in Paris in April, 1874. "
				+ "The painting is credited with inspiring the name of the Impressionist movement. "
				+ "\nImpression, Sunrise depicts the port of Le Havre, Monet's hometown. "
				+ "It is now displayed at the Musée Marmottan Monet in Paris.",2,17);
		j3.getContentPane().add(txt7);
		txt7.setVisible(true);
		
		JTextPane txt8 = new text01(960, 470, 512, 185,"From a distance of ten feet or so, Monet's brushstrokes blend to yield a "
				+ "convincing view of the Seine and the pleasure boats that drew tourists to Argenteuil. "
				+ "Up close, however, each dab of paint is distinct, and the scene dissolves into a mosaic of paint—brilliant, "
				+ "unblended tones of blue, red, green, yellow. In the water, quick, fluid skips of the brush mimic the lapping surface. "
				+ "In the trees, thicker paint is applied with denser, stubbier strokes. The figure in the sailboat is only a ghostly wash "
				+ "of dusty blue, the women rowing nearby are indicated by mere shorthand.",1,17);
		j3.getContentPane().add(txt8);
		txt8.setVisible(true);
		
		JButton stop = new homeButton("Back to Home");
		stop.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if(vs.isPlay()) {
					vs.stopPlay();
				}
				j3.dispose();
				ApplicationDriver a = new ApplicationDriver();
				a.mainMenu(a);
			}
		});
		j3.getContentPane().add(stop);
		
		JButton nc = new nextButton("Next Chapter");
		nc.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				j3.dispose();
				new Monet04();
			}
		});
		j3.getContentPane().add(nc);
	}

}
