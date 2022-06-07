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

public class VanGogh01 extends JFrame implements setSoundTrack03{
	public VanGogh01() {
		Initial j1 = new Initial("Vincent van Gogh");
		music vs = this.set();
	
		JTextPane txt = new text01(20, 466, 700, 206,"Vincent Willem van Gogh "
				+ "was a Dutch post-impressionist painter who posthumously became one of the most famous and "
				+ "influential figures in the history of Western art. "
				+ "He was not commercially successful, and his suicide at thirty-seven came after years of depression and poverty."
				+ "\n\nIn a decade, he created about 2,100 artworks, "
				+ "including around 860 oil paintings, most of which date from the last two years of his life. "
				+ "They include landscapes, still lifes, portraits and self-portraits, and are characterised by bold "
				+ "colours and dramatic, impulsive and expressive brushwork that contributed to the foundations of modern art. ", 3, 17);
		j1.getContentPane().add(txt);
		
		JTextPane txt1 = new text01(20, 450, 700, 208,"Born into an upper-middle-class family, Van Gogh drew as a child and was serious, quiet,"
				+ " and thoughtful. As a young man, he worked as an art dealer, often traveling, but became depressed after he was transferred"
				+ " to London. He turned to religion and spent time as a Protestant missionary in southern Belgium. He drifted in ill health "
				+ "and solitude before taking up painting in 1881, having moved back home with his parents. His younger brother Theo "
				+ "supported him financially, and the two kept a long correspondence by letter. "
				+ "\n\nVan Gogh suffered from psychotic episodes and delusions and though he worried about his mental stability, "
				+ "he often neglected his physical health, did not eat properly and drank heavily. ",2,17);
		j1.getContentPane().add(txt1);
		txt1.setVisible(false);
		
		JTextPane txt2 = new text01(760, 450, 700, 208,"His early works, mostly still lifes and depictions of peasant labourers, "
				+ "contain few signs of the vivid colour that distinguished his later work. In 1886, he moved to Paris, "
				+ "where he met members of the avant-garde, including Émile Bernard and Paul Gauguin, who were reacting against "
				+ "the Impressionist sensibility. \n\nAs his work developed, he created a new approach to still lifes and local landscapes. "
				+ "His paintings grew brighter as he developed a style that became fully realised during his stay in Arles in the south of "
				+ "France in 1888. During this period he broadened his subject matter to include series of olive trees, wheat fields, "
				+ "and sunflowers. His friendship with Gauguin ended after a confrontation with a razor when, "
				+ "in a rage, he severed part of his own left ear. ", 1, 17);
		j1.getContentPane().add(txt2);
		txt2.setVisible(false);
		
		JLabel vs1 = new image(20, 20, 700, 400,"/03_01.png");
		j1.getContentPane().add(vs1);
		
		JLabel vs2 = new image(20, 20, 700, 408,"/03_02.png");
		j1.getContentPane().add(vs2);
		vs2.setVisible(false);
		
		JLabel vs3 = new image(760, 20, 700, 408,"/03_03.png");
		j1.getContentPane().add(vs3);
		vs3.setVisible(false);
		
		
		Timer timer = new Timer(32000, new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				vs1.setVisible(false);
				vs2.setVisible(true);
				txt.setVisible(false);
				txt1.setVisible(true);
			}
			
		});
		
		Timer timer1 = new Timer(60000, new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				txt2.setVisible(true);
				vs3.setVisible(true);
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
		hear.setBounds(330, 427, 81, 33);
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
				new VanGogh02();
			}
		});
		j1.getContentPane().add(nc);
	}
	

}
