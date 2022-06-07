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

public class Picasso01 extends JFrame implements setSoundTrack05{
	public Picasso01() {
		Initial j1 = new Initial("Pablo Picasso");
		music vs = this.set();
	
		JTextPane txt = new text01(20, 470, 700, 190,"Pablo Ruiz Picasso was a Spanish painter, "
				+ "sculptor, printmaker, ceramicist and theatre designer who spent most of his adult life in France. "
				+ "Regarded as one of the most influential artists of the 20th century, he is known for co-founding the Cubist movement, "
				+ "the invention of constructed sculpture,  the co-invention of collage, and for the wide variety of styles that he helped "
				+ "develop and explore. \n\nPicasso demonstrated extraordinary artistic talent in his early years, "
				+ "painting in a naturalistic manner through his childhood and adolescence. During the first decade of the 20th century, "
				+ "his style changed as he experimented with different theories, techniques, and ideas. ", 3, 15);
		j1.getContentPane().add(txt);
		
		JTextPane txt1 = new text01(20, 460, 700, 190,"Picasso was born at 23:15 on 25 October 1881, in the city of Málaga, Andalusia, in southern Spain. "
				+ "He was the first child of Don José Ruiz y Blasco (1838–1913) and María Picasso y López. "
				+ "According to his mother, his first words were \"piz, piz\", a shortening of lápiz, the Spanish word for \"pencil\". "
				+ "Picasso's family was of middle-class background. "
				+ "\n\nHis father was a painter who specialized in naturalistic depictions of birds and other game. "
				+ "For most of his life, Ruiz was a professor of art at the School of Crafts and a curator of a local museum. "
				+ "Ruiz gave him a formal education in art starting from the age of 7. "
				+ "By his 13, Ruiz vowed to give up painting as he felt that Pablo had surpassed him.",2,17);
		j1.getContentPane().add(txt1);
		txt1.setVisible(false);
		
		JTextPane txt2 = new text01(760, 460, 700, 190,"Picasso's work is often categorized into periods. "
				+ "While the names of many of his later periods are debated, the most commonly accepted periods in his work are the "
				+ "Blue Period (1901–1904), the Rose Period (1904–1906), the African-influenced Period (1907–1909), "
				+ "Analytic Cubism (1909–1912), and Synthetic Cubism (1912–1919), also referred to as the Crystal period. "
				+ "Much of Picasso's work of the late 1910s and early 1920s is in a neoclassical style, and his work in the mid-1920s often "
				+ "has characteristics of Surrealism. His later work often combines elements of his earlier styles."
				+ " Exceptionally prolific throughout the course of his long life, Picasso achieved universal renown and immense fortune for his revolutionary artistic accomplishments, "
				+ "and became one of the best-known figures in 20th-century art.", 2, 17);
		j1.getContentPane().add(txt2);
		txt2.setVisible(false);
		
		JLabel vs1 = new image(70, 20, 562, 400,"/05_01.png");
		j1.getContentPane().add(vs1);
		
		JLabel vs2 = new image(60, 25, 612, 408,"/05_02.png");
		j1.getContentPane().add(vs2);
		vs2.setVisible(false);
		
		JLabel vs3 = new image(770, 25, 682, 408,"/05_03.png");
		j1.getContentPane().add(vs3);
		vs3.setVisible(false);
		
		
		Timer timer = new Timer(25000, new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				vs1.setVisible(false);
				vs2.setVisible(true);
				txt.setVisible(false);
				txt1.setVisible(true);
			}
			
		});
		
		Timer timer1 = new Timer(45000, new ActionListener() {
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
		hear.setBounds(315, 430, 81, 33);
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
				new Picasso02();
			}
		});
		j1.getContentPane().add(nc);
	}
	

}
