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

public class Rembrandt01 extends JFrame implements setSoundTrack02{
	public Rembrandt01() {
		Initial j1 = new Initial("Rembrandt Harmenszoon van Rijn");
		music vs = this.set();
		
		JTextPane txt0 = new text01(900, 705, 585, 15,"audio retrieved from Ducksters. \"Biography: Rembrandt Art for Kids.\" Ducksters, Technological Solutions, Inc. (TSI)",2,10);
		txt0.setForeground(SystemColor.desktop);
		txt0.setBackground(new Color(240, 240, 240));
		j1.getContentPane().add(txt0);
		txt0.setVisible(false);
	
		JTextPane txt = new text01(20, 430, 700, 240,"Rembrandt Harmenszoon van Rijn, usually "
				+ "simply known as Rembrandt, was a Dutch Golden Age painter, printmaker and draughtsman. An innovative and "
				+ "prolific master in three media, he is generally considered one of the greatest visual artists in the history "
				+ "of art and the most important in Dutch art history. \n\nUnlike most Dutch masters of the 17th century, "
				+ "Rembrandt's works depict a wide range of style and subject matter, from portraits and self-portraits to landscapes, "
				+ "genre scenes, allegorical and historical scenes, and biblical and mythological themes as well as animal studies. "
				+ "His contributions to art came in a period of great wealth and cultural achievement that historians "
				+ "call the Dutch Golden Age, when Dutch art (especially Dutch painting), although in many ways antithetical to the Baroque style "
				+ "that dominated Europe, was extremely prolific and innovative and gave rise to important new genres.", 3, 15);
		j1.getContentPane().add(txt);
		
		JTextPane txt1 = new text01(20, 450, 700, 210,"Rembrandt Harmenszoon van Rijn was born on 15 July 1606 in Leiden, "
				+ "in the Dutch Republic, now the Netherlands. He was the ninth child born to Harmen Gerritszoon van Rijn "
				+ "and Neeltgen Willemsdochter van Zuijtbrouck. His family was quite well-to-do; his father was a miller "
				+ "and his mother was a baker's daughter. Religion is a central theme in Rembrandt's works and the "
				+ "religiously fraught period in which he lived makes his faith a matter of interest."
				+ "\nBy 1632, he was already demonstrating his versatility and impressive range. "
				+ "He experimented with saturating large areas with color and intense chiaroscuro "
				+ "to achieve unprecedented levels of psychological character in his sitters, "
				+ "as well as dramatic interior and exterior scenes.",2,17);
		j1.getContentPane().add(txt1);
		txt1.setVisible(false);
		
		JTextPane txt2 = new text01(760, 450, 700, 208,"In 1634, Rembrandt married Saskia van Uylenburgh, "
				+ "the cousin of one of Rembrandt’s first dealers, Hendrick van Uylenburgh. "
				+ "Saskia gave birth to four of Rembrandt’s five children, although three of them died in infancy. "
				+ "Only their fourth child, Titus, who was born in 1641, survived into adulthood. "
				+ "Saskia died in 1642, probably of tuberculosis, prompting Rembrandt to produce some of his most successful works: "
				+ "dark portraits of his sick and dying wife. \n\nAfter Saskia’s death, he had a child, Cornelia, with his former maid "
				+ "Hendrickje Stoffels, who later became his common law wife. "
				+ "Cornelia was Rembrandt’s only living immediate family member at the time of his death.", 2, 17);
		j1.getContentPane().add(txt2);
		txt2.setVisible(false);
		
		
		JLabel vs1 = new image(50, 20, 550, 400,"/02_01.png");
		j1.getContentPane().add(vs1);
		
		JLabel vs2 = new image(20, 20, 700, 408,"/02_02.png");
		j1.getContentPane().add(vs2);
		vs2.setVisible(false);
		
		JLabel vs3 = new image(760, 20, 700, 408,"/02_03.png");
		j1.getContentPane().add(vs3);
		vs3.setVisible(false);
		
		
		Timer timer = new Timer(38000, new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				vs1.setVisible(false);
				vs2.setVisible(true);
				txt.setVisible(false);
				txt1.setVisible(true);
			}
			
		});
		
		Timer timer1 = new Timer(95000, new ActionListener() {
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
		hear.setBounds(600, 220, 81, 33);
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
				new Rembrandt02();
			}
		});
		j1.getContentPane().add(nc);
	}
	

}
