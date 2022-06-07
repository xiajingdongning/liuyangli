import java.awt.Color;
import java.awt.Font;
import java.awt.SystemColor;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JRadioButton;
import javax.swing.JTextPane;
import javax.swing.SwingConstants;
import javax.swing.Timer;

public class Monet01 extends JFrame implements setSoundTrack04{
	public Monet01() {
		Initial j1 = new Initial("Claude Monet");
		music vs = this.set();
		
		JTextPane txt0 = new text01(1160, 705, 330, 15,"audio retrieved from Goodbye-Art Academy by Philinthecircle",2,10);
		txt0.setForeground(SystemColor.desktop);
		txt0.setBackground(new Color(240, 240, 240));
		j1.getContentPane().add(txt0);
		txt0.setVisible(false);
	
		JTextPane txt = new text01(20, 455, 673, 220,"Oscar-Claude Monet was a French painter and founder of impressionist painting "
				+ "who is seen as a key precursor to modernism, especially in his attempts to paint nature as he perceived it. "
				+ "During his long career, he was the most consistent and prolific practitioner of impressionism's philosophy of "
				+ "expressing one's perceptions before nature, especially as applied to plein air (outdoor) landscape painting. "
				+ "The term \"Impressionism\" is derived from the title of his painting Impression, soleil levant, exhibited in "
				+ "1874 in the first Salon des Refusés (\"exhibition of rejects\") initiated by Monet and his associates as an "
				+ "alternative to the Salon."
				+ "\n\nFrequently exhibited and successful during his lifetime, his fame and popularity soared in the second half "
				+ "of the 20th century when he became one of the word's most famous painters and a source of inspiration for burgeoning "
				+ "groups of artists.", 3, 15);
		j1.getContentPane().add(txt);
		
		JTextPane txt1 = new text01(20, 450, 700, 210,"Claude Monet was born on 14 November 1840 on the fifth floor of 45 rue Laffitte, "
				+ "in the 9th arrondissement of Paris. Monet was raised in Le Havre, Normandy, and became interested in the outdoors and "
				+ "drawing from an early age. \n\nAlthough his mother, Louise-Justine Aubrée Monet, supported his ambitions to be a painter, "
				+ "his father, Claude-Adolphe, disapproved and wanted him to pursue a career in business. He was very close to his mother, "
				+ "but she died in January 1857 when he was sixteen years old, and he was sent to live with his childless, widowed but wealthy "
				+ "aunt, Marie-Jeanne Lecadre. He went on to study at the Académie Suisse, and under the academic history painter Charles Gleyre, "
				+ "where he was a classmate of Auguste Renoir. ",2,17);
		j1.getContentPane().add(txt1);
		txt1.setVisible(false);
		
		JTextPane txt2 = new text01(760, 450, 700, 210,"His early works include landscapes, seascapes, and portraits, but attracted little attention. "
				+ "A key early influence was Eugène Boudin who introduced him to the concept of plein air painting. "
				+ "From 1883, Monet lived in Giverny, also in northern France, where he purchased a house and property and began a vast "
				+ "landscaping project, including a water-lily pond."
				+ "\n\nHis ambition to documenting the French countryside led to a method of painting the same scene many times so as "
				+ "to capture the changing of light and passing of the seasons. Among the best known examples are his series of "
				+ "haystacks (1890–91), paintings of the Rouen Cathedral (1894) and the paintings of water lilies in his garden in "
				+ "Giverny that occupied him continuously for the last 20 years of his life.", 2, 17);
		j1.getContentPane().add(txt2);
		txt2.setVisible(false);
		
		JLabel vs1 = new image(10, 20, 673, 400,"/04_01.png");
		j1.getContentPane().add(vs1);
		
		JLabel vs2 = new image(20, 20, 700, 408,"/04_02.png");
		j1.getContentPane().add(vs2);
		vs2.setVisible(false);
		
		JLabel vs3 = new image(780, 20, 654, 408,"/04_03.png");
		j1.getContentPane().add(vs3);
		vs3.setVisible(false);
		
		
		Timer timer = new Timer(19000, new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				vs1.setVisible(false);
				vs2.setVisible(true);
				txt.setVisible(false);
				txt1.setVisible(true);
			}
			
		});
		
		Timer timer1 = new Timer(56000, new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				txt2.setVisible(true);
				vs3.setVisible(true);
				txt0.setVisible(false);
			}
		});

		JRadioButton hear = new JRadioButton("Play");
		Timer timer2 = new Timer(1000, new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				hear.setVisible(false);
			}
		});
		hear.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				vs.displayMusic();
				txt0.setVisible(true);
				timer.start();
				timer1.start();
				timer2.start();
			}
		});
		hear.setHorizontalAlignment(SwingConstants.CENTER);
		hear.setBackground(SystemColor.text);
		hear.setForeground(new Color(0, 0, 0));
		hear.setFont(new Font("Georgia", Font.ITALIC, 16));
		hear.setEnabled(false);
		hear.setBounds(315, 420, 81, 33);
		j1.getContentPane().add(hear);
		
		JButton stop = new homeButton("Back to Home");
		stop.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if(vs.isPlay()) {
					vs.stopPlay();
				}
				j1.dispose();
				ApplicationDriver a = new ApplicationDriver();
				a.mainMenu(a);
			}
		});
		j1.getContentPane().add(stop);
		
		JButton nc = new nextButton("Next Chapter");
		nc.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				j1.dispose();
				new Monet02();
			}
		});
		j1.getContentPane().add(nc);
	}
	

}
