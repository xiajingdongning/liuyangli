import java.awt.Color;
import java.awt.Font;
import java.awt.SystemColor;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextPane;

public class DaVinci03 extends JFrame implements setSoundTrack01{
	
	public DaVinci03() {
		Initial j3 = new Initial("Leonardo da Vinci");
		music vs = this.set();
		
		JLabel vs5 = new image(20, 45, 500, 436,"/01_05.png");
		j3.getContentPane().add(vs5);
		vs5.setVisible(true);
		
		JLabel vs6 = new image(560, 45, 900, 436,"/01_06.png");
		j3.getContentPane().add(vs6);
		vs6.setVisible(true);
		
		JTextPane txt5 = new text01(20, 525, 500, 100,"In 2017, Salvator Mundi, attributed in whole or part to Leonardo, was sold at auction "
				+ "for US$450.3 million, setting a new record for the most expensive painting ever sold at public auction.",2,18);
		j3.getContentPane().add(txt5);
		txt5.setVisible(true);
		
		JTextPane txt6 = new text01(560, 525, 900, 100,"Annunciation is a painting on wood that dated to circa 1472–1475. "
				+ "The subject matter of the work is drawn from Luke 1.26–39. It depicts the angel Gabriel announcing to Mary that she would "
				+ "conceive miraculously and give birth to a son to be named Jesus and called \"the Son of God\", whose reign would never end. "
				+ "The innovations Leonardo introduced in this paintings: sfumato and atmospheric perspective.",2,18);
		j3.getContentPane().add(txt6);
		txt6.setVisible(true);
		
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
				new DaVinci04();
			}
		});
		j3.getContentPane().add(nc);
	}

}
