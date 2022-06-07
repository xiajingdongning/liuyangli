import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextPane;

public class Picasso03 extends JFrame implements setSoundTrack05{
	public Picasso03() {
		Initial j3 = new Initial("Pablo Picasso");
		music vs = this.set();
		
		JLabel vs7 = new image(5, 20, 375, 519,"/05_07.jpg");
		j3.getContentPane().add(vs7);
		vs7.setVisible(true);
		
		JLabel vs8 = new image(385, 70, 512, 415,"/05_08.png");
		j3.getContentPane().add(vs8);
		vs8.setVisible(true);
		
		JLabel vs9 = new image(900, 20, 580, 400,"/05_09.png");
		j3.getContentPane().add(vs9);
		vs9.setVisible(true);
		
		JTextPane txt6 = new text01(5, 540, 375, 160,"Analytic cubism (1909–1912) is a style of painting Picasso "
				+ "developed with Georges Braque using monochrome brownish and neutral colours. Both artists took apart objects and \"analyzed\" "
				+ "them in terms of their shapes. Picasso and Braque's paintings at this time share many similarities. "
				+ "In 1911, Picasso was arrested and questioned about the theft of the Mona Lisa from the Louvre.",2,16);
		j3.getContentPane().add(txt6);
		txt6.setVisible(true);
		
		JTextPane txt7 = new text01(385, 510, 512, 150,"Synthetic cubism (1912–1919) was a further development of the genre of cubism, "
				+ "in which cut paper fragments – often wallpaper or portions of newspaper pages – were pasted into compositions, "
				+ "marking the first use of collage in fine art. Between 1915 and 1917, Picasso began a series of paintings depicting "
				+ "highly geometric and minimalist Cubist objects, consisting of either a pipe, a guitar or a glass, with an occasional "
				+ "element of collage.",2,17);
		j3.getContentPane().add(txt7);
		txt7.setVisible(true);
		
		JTextPane txt8 = new text01(900, 445, 580, 205,"In the summer of 1918, Picasso married Olga Khokhlova, "
				+ "a ballerina with Sergei Diaghilev's troupe, for whom Picasso was designing a ballet, Erik Satie's Parade, in Rome. "
				+ "he two had a son, Paulo Picasso. In 1927, Picasso met 17-year-old Marie-Thérèse Walter and began a secret affair with her. "
				+ "Picasso's marriage to Khokhlova soon ended in separation rather than divorce, as Picasso did not want Khokhlova to have "
				+ "half his wealth. The two remained legally married until Khokhlova's death in 1955. "
				+ "Picasso fathered a daughter with Marie-Thérèse, named Maya. Marie-Thérèse lived in the vain hope that Picasso would one "
				+ "day marry her, and hanged herself four years after Picasso's death.",1,17);
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
				new Picasso04();
			}
		});
		j3.getContentPane().add(nc);
	}

}
