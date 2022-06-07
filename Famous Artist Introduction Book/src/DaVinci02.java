import java.awt.Color;
import java.awt.Font;
import java.awt.Image;
import java.awt.SystemColor;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextPane;

public class DaVinci02 extends JFrame implements setSoundTrack01{
	public DaVinci02() {
		Initial j2 = new Initial("Leonardo da Vinci");
		music vs = this.set();
		
		JTextPane txt3 = new text01(1250, 45, 215, 345,"Under the patronage of the Sforzas, Leonardo painted ‘The Last Supper’ "
				+ "in the refectory of the Monastery of Santa Maria delle Grazie. "
				+ "Leonardo would spend 17 years in Milan, leaving only after Duke Ludovico Sforza’s fall from power in 1499.\n"
				+ "\nThe Last Supper is the most reproduced religious painting of all time and has been the target of much speculation "
				+ "by writers and historical revisionists.",1,17);
		j2.getContentPane().add(txt3);
		txt3.setVisible(true);
		
		JTextPane txt4 = new text01(1250, 400, 215, 245,"Musicians have speculated that the true hidden message in The Last Supper is actually "
				+ "an accompanying soundtrack. In 2007, Italian musician Giovanni Maria Pala created 40 seconds of a somber song using notes supposedly encoded "
				+ "within da Vinci's distinctive composition.",1,17);
		j2.getContentPane().add(txt4);
		txt4.setVisible(true);
		
		JLabel vs4 = new image(30, 45, 1200, 600,"/01_04.jpg");
		j2.getContentPane().add(vs4);
		vs4.setVisible(true);
		
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
				new DaVinci03();
			}
		});
		j2.getContentPane().add(nc);
	}
	

}
