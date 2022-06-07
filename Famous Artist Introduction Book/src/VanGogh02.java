import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextPane;

public class VanGogh02 extends JFrame implements setSoundTrack03{
	public VanGogh02() {
		Initial j2 = new Initial("Vincent van Gogh");
		music vs = this.set();
		
		JTextPane txt3 = new text01(50, 430, 300, 230,"Van Gogh moved to Paris in March 1886 where he shared Theo's rue Laval "
				+ "apartment in Montmartre and studied at Fernand Cormon's studio. \nHe tried his hand at Japonaiserie, "
				+ "tracing a figure from a reproduction on the cover of the magazine Paris Illustre, The Courtesan or Oiran (1887), "
				+ "after Keisai Eisen, which he then graphically enlarged in a painting.",2,17);
		j2.getContentPane().add(txt3);
		txt3.setVisible(true);
		
		JTextPane txt4 = new text01(390, 430, 502, 230,"In February 1888 Van Gogh sought refuge in Arles. "
				+ "The time in Arles became one of Van Gogh's more prolific periods: he completed 200 paintings and more than 100 drawings "
				+ "and watercolours. He was enchanted by the local countryside and light; his works from this period are rich in yellow, "
				+ "ultramarine and mauve.\nOn 1 May 1888, for 15 francs per month, he signed a lease for the eastern wing of the "
				+ "Yellow House at 2 place Lamartine. The rooms were unfurnished and had been uninhabited for months."
				+ " Bedroom in Arles is the title given to each of three similar paintings depict van Gogh's bedroom at the Yellow House.",2,17);
		j2.getContentPane().add(txt4);
		txt4.setVisible(true);
		
		JTextPane txt5 = new text01(930, 430, 508, 228,"Van Gogh wrote many letters to his brother, Theo van Gogh, and often included details of"
				+ " his latest work. The artist wrote his brother more than once about The Night Café. \nIn one of the letters, he describes "
				+ "this painting: I have tried to express the terrible passions of humanity by means of red and green. "
				+ "The room is blood red and dark yellow with a green billiard table in the middle; there are four lemon-yellow lamps with a glow of orange and green. "
				+ " The next day (September 9), he wrote Theo: “In my picture of the Night Café I have tried to express the idea that "
				+ "the café is a place where one can ruin oneself, go mad or commit a crime.”",2,17);
		j2.getContentPane().add(txt5);
		txt5.setVisible(true);
		
		JLabel vs4 = new image(50, 20, 300, 400,"/03_04.png");
		j2.getContentPane().add(vs4);
		vs4.setVisible(true);
		
		JLabel vs5 = new image(390, 20, 500, 397,"/03_05.png");
		j2.getContentPane().add(vs5);
		vs5.setVisible(true);
		
		JLabel vs6 = new image(930, 20, 508, 401,"/03_06.png");
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
				new VanGogh03();
			}
		});
		j2.getContentPane().add(nc);
	}

}
