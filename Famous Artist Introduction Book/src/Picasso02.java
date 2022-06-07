import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextPane;

public class Picasso02 extends JFrame implements setSoundTrack05{
	public Picasso02() {
		Initial j2 = new Initial("Pablo Picasso");
		music vs = this.set();
		
		JTextPane txt3 = new text01(20, 460, 600, 205,"Picasso's Blue Period (1901–1904), characterized by sombre paintings rendered in shades of blue and blue-green only occasionally warmed by other colours, "
				+ "began either in Spain in early 1901 or in Paris in the second half of the year. "
				+ "In his austere use of colour and sometimes doleful subject matter—prostitutes and beggars are frequent subjects—Picasso was influenced by a trip"
				+ " through Spain and by the suicide of his friend Carles Casagemas. "
				+ "Starting in autumn of 1901, he painted several posthumous portraits of Casagemas culminating in the gloomy allegorical painting La Vie (1903). "
				+ "Blindness, a recurrent theme in Picasso's works of this period, is also represented in "
				+ "The Blindman's Meal (1903, the Metropolitan Museum of Art).",2,17);
		j2.getContentPane().add(txt3);
		txt3.setVisible(true);
		
		JTextPane txt4 = new text01(640, 460, 400, 190,"The Rose Period (1904–1906) is characterised by a lighter tone and "
				+ "style utilising orange and pink colours and featuring many circus people, acrobats and harlequins known in France as saltimbanques."
				+ " The harlequin, a comedic character usually depicted in checkered patterned clothing, became a personal symbol for Picasso."
				+ "By 1905, Picasso became a favourite of American art collectors Leo and Gertrude Stein.",2,17);
		j2.getContentPane().add(txt4);
		txt4.setVisible(true);
		
		JTextPane txt5 = new text01(1060, 455, 410, 245,"Picasso's African-influenced Period (1907–1909) begins with his painting Les Demoiselles d'Avignon. "
				+ "Picasso painted this composition in a style inspired by Iberian sculpture, but repainted the faces of the two figures on the "
				+ "right after being powerfully impressed by African artefacts he saw in June 1907 in the ethnographic museum at Palais du "
				+ "Trocadéro. When he displayed the painting to acquaintances in his studio later that year, the nearly universal reaction was "
				+ "shock and revulsion; Matisse angrily dismissed the work as a hoax. Picasso did not exhibit Les Demoiselles publicly until 1916.",2,17);
		j2.getContentPane().add(txt5);
		txt5.setVisible(true);
		
		JLabel vs4 = new image(20, 20, 600, 420,"/05_04.png");
		j2.getContentPane().add(vs4);
		vs4.setVisible(true);
		
		JLabel vs5 = new image(640, 20, 400, 400,"/05_05.png");
		j2.getContentPane().add(vs5);
		vs5.setVisible(true);
		
		JLabel vs6 = new image(1065, 15, 400, 415,"/05_06.png");
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
				new Picasso03();
			}
		});
		j2.getContentPane().add(nc);
	}

}
