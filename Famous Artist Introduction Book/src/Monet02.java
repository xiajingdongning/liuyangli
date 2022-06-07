import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextPane;

public class Monet02 extends JFrame implements setSoundTrack04{
	public Monet02() {
		Initial j2 = new Initial("Claude Monet");
		music vs = this.set();
		
		JTextPane txt3 = new text01(43, 430, 512, 245,"Camille-Léonie Doncieux was born in the town of La Guillotiere, "
				+ "now part of Lyons, France, on 15 January 1847. She met Monet, seven years her senior, in 1865 and became "
				+ "his model posing for numerous paintings. \nShe was Monet's mistress, living in poverty at the beginning of his career. "
				+ "During Camille's pregnancy with their first son, she was left behind in Paris without funds for her care. "
				+ "In Paris on 8 August 1867, Camille Doncieux gave birth to Jean, her first son with Claude Monet. "
				+ "Camille and Monet were married on 28 June 1870 in the 8th arrondissement of Paris during a civil ceremony. "
				+ "Although Monet's father was not present because he did not approve of his marriage, Camille's parents attended the ceremony.",1,17);
		j2.getContentPane().add(txt3);
		txt3.setVisible(true);
		
		JTextPane txt4 = new text01(1040, 515, 410, 162,"Camille became ill after the Hoschedés family came to live with the Monets. "
				+ "Their second son, Michel was born on 17 March 1878, and Camille's poor health was further degraded. "
				+ "She died of pelvic cancer (although some sources say the cause of her death was tuberculosis, or possibly a botched abortion)"
				+ " on 5 September 1879 in Vétheuil. Monet painted her on her deathbed.",1,17);
		j2.getContentPane().add(txt4);
		txt4.setVisible(true);
		
		
		JLabel vs4 = new image(40, 30, 512, 388,"/04_04.png");
		j2.getContentPane().add(vs4);
		vs4.setVisible(true);
		
		JLabel vs5 = new image(600, 15, 400, 658,"/04_05.png");
		j2.getContentPane().add(vs5);
		vs5.setVisible(true);
		
		JLabel vs6 = new image(1050, 15, 382, 502,"/04_06.png");
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
				new Monet03();
			}
		});
		j2.getContentPane().add(nc);
	}

}
