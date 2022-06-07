import java.awt.Color;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextPane;
import java.awt.Font;

import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import javax.swing.BoxLayout;
import javax.swing.ImageIcon;

import net.miginfocom.swing.MigLayout;
import java.awt.GridLayout;
import java.awt.Image;
import java.awt.BorderLayout;
import java.awt.CardLayout;
import javax.swing.SpringLayout;
import com.jgoodies.forms.layout.FormLayout;
import com.jgoodies.forms.layout.ColumnSpec;
import com.jgoodies.forms.layout.RowSpec;
import javax.swing.JRadioButton;
import javax.swing.UIManager;
import java.awt.SystemColor;
import javax.swing.SwingConstants;
import javax.swing.Timer;

import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.File;
import java.io.IOException;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import javax.swing.JButton;

public class DaVinci01 extends JFrame implements setSoundTrack01{

	public DaVinci01() {
		//Using this artist's initialization design JFrame
		Initial j1 = new Initial("Leonardo da Vinci");
		//Using interface default method to control the music for four chapters
		music vs = this.set();
	
		//Using abstract text design pattern 01 method to reduce code replication
		JTextPane txt = new text01(20, 440, 550, 215,"Leonardo da Vinci (15 April 1452 \u2013 2 May 1519)\nwas an Italian polymath of the High Renaissance who was active as a painter, draughtsman, "
				+ "engineer, scientist, theorist, sculptor and architect. While his fame initially rested on his achievements as a painter, "
				+ "he also became known for his notebooks, in which he made drawings and notes on a variety of subjects, including anatomy, astronomy, "
				+ "botany, cartography, painting, and paleontology. Leonardo's genius epitomized the Renaissance humanist ideal, and his collective works "
				+ "compose a contribution to later generations of artists matched only by that of his younger contemporary, Michelangelo.\n", 3, 16);
		j1.getContentPane().add(txt);
		
		JTextPane txt1 = new text01(20, 450, 700, 210,"Born out of wedlock to a successful notary and a lower-class woman in, or near, Vinci, he was educated in Florence by the renowned Italian painter "
				+ "and sculptor Andrea del Verrocchio. He began his career in the city, but then spent much time in the service of Ludovico Sforza in Milan. "
				+ "\nLater, he worked in Florence and Milan again, as well as briefly in Rome, all while attracting a large following of imitators and students. "
				+ "Upon the invitation of Francis I, he spent his last three years in France, where he died in 1519. \nSince his death, there has not been a time where "
				+ "his achievements, diverse interests, personal life, and empirical thinking have failed to incite interest and admiration, making him a frequent namesake "
				+ "and subject in culture.",2,17);
		j1.getContentPane().add(txt1);
		txt1.setVisible(false);
		
		JTextPane txt2 = new text01(760, 450, 700, 208,"Leonardo had no surname in the modern sense. His birth name – Lionardo di ser Piero da Vinci – means “Leonardo, (son) of ser Piero from Vinci.” "
				+ "To his contemporaries he was known just as Leonardo or “Il Florentine” – since he lived near Florence. "
				+ "Leonardo was largely self-educated and received no formal education beyond basic reading, writing and mathematics.\r\n"
				+ "\nIn 1478, Leonardo received his first independent commission: to paint an alterpiece for the Chapel of St. Bernard in Florence’s Palazzo Vecchio. "
				+ "In 1481, he was commissioned to paint ‘The Adoration of the Magi’ for the monastery San Donato in Florence. "
				+ "However, he was forced to abandon both commissions when he relocated to Milan to work for the Sforza family. "
				+ "Thus, his first commissions were never completed.", 1, 16);
		j1.getContentPane().add(txt2);
		txt2.setVisible(false);
		
		//Using image method to abstract
		JLabel vs1 = new image(20, 20, 550, 400,"/01_01.png");
		j1.getContentPane().add(vs1);
		
		JLabel vs2 = new image(20, 20, 700, 408,"/01_02.png");
		j1.getContentPane().add(vs2);
		vs2.setVisible(false);
		
		JLabel vs3 = new image(760, 20, 700, 408,"/01_03.png");
		j1.getContentPane().add(vs3);
		vs3.setVisible(false);
		
		
		Timer timer = new Timer(1500, new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				vs1.setVisible(false);
				vs2.setVisible(true);
				txt.setVisible(false);
				txt1.setVisible(true);
			}
			
		});
		
		Timer timer1 = new Timer(30000, new ActionListener() {
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
				//Using music abstract class
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
		hear.setBounds(219, 368, 81, 33);
		j1.getContentPane().add(hear);
		
		JButton stop = new homeButton("Back to Home");
		stop.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				//Stop playing music if user want to go back to explore other artists
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
				//Close the current frame
				j1.dispose();
				new DaVinci02();
			}
		});
		j1.getContentPane().add(nc);
	}
	
	
}
