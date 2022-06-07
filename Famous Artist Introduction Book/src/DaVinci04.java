import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextPane;
import javax.swing.Timer;

public class DaVinci04 extends JFrame implements setSoundTrack01{
	public DaVinci04() {
		Initial j4 = new Initial("Leonardo da Vinci");
		music vs = this.set();
		
		JLabel vs7 = new image(40, 15, 436, 310,"/01_07.png");
		j4.getContentPane().add(vs7);
		vs7.setVisible(true);
		
		JLabel vs8 = new image(40, 355, 436, 310,"/01_08.png");
		j4.getContentPane().add(vs8);
		vs8.setVisible(true);
		
		JLabel vs9 = new image(524, 15, 436, 310,"/01_09.png");
		j4.getContentPane().add(vs9);
		vs9.setVisible(true);
		
		JLabel vs10 = new image(524, 355, 436, 310,"/01_10.png");
		j4.getContentPane().add(vs10);
		vs10.setVisible(true);
		
		JLabel vs11 = new image(1008, 15, 436, 310,"/01_11.png");
		j4.getContentPane().add(vs11);
		vs11.setVisible(true);
		
		JLabel vs12 = new image(20, 0, 472, 625,"/01_12.png");
		j4.getContentPane().add(vs12);
		vs12.setVisible(false);
		
		JLabel vs13 = new image(523, 0, 473, 625,"/01_13.png");
		j4.getContentPane().add(vs13);
		vs13.setVisible(false);
		
		JLabel vs14 = new image(1030, 0, 432, 625,"/01_14.png");
		j4.getContentPane().add(vs14);
		vs14.setVisible(false);
		
		JTextPane txt7 = new text01(1008, 365, 436, 290,"Revered for his technological ingenuity, he conceptualized flying machines,"
				+ " a type of armored fighting vehicle, concentrated solar power, an adding machine, and the double hull. "
				+ "Relatively few of his designs were constructed or even feasible during his lifetime, as the modern scientific "
				+ "approaches to metallurgy and engineering were only in their infancy during the Renaissance. "
				+ "\n\nWhile the full extent of his scientific studies has only become recognized in the last 150 years, during his "
				+ "lifetime he was employed for his engineering and skill of invention.",3,17);
		j4.getContentPane().add(txt7);
		txt7.setVisible(true);
		
		JTextPane txt8 = new text01(22, 630, 1435, 50, "Some of his smaller inventions, however, entered the world of manufacturing unheralded,"
				+ " such as an automated bobbin winder and a machine for testing the tensile strength of wire. "
				+ "He made substantial discoveries in anatomy, civil engineering, hydrodynamics, geology, optics, and tribology, "
				+ "but he did not publish his findings and they had little to no direct influence on subsequent science.",1,16);
		j4.getContentPane().add(txt8);
		txt8.setVisible(false);
		
		Timer timer = new Timer(500, new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				vs8.setVisible(false);
			}
		});
		Timer timer1 = new Timer(1000, new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				vs9.setVisible(false);
			}
		});
		Timer timer2 = new Timer(1500, new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				vs10.setVisible(false);
			}
		});
		Timer timer3 = new Timer(2000, new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				vs11.setVisible(false);
			}
		});
		Timer timer4 = new Timer(2500, new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				txt7.setVisible(false);
			}
		});
		Timer timer5 = new Timer(3000, new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				vs12.setVisible(true);
				vs13.setVisible(true);
				vs14.setVisible(true);
				txt8.setVisible(true);
			}
		});
		
		
		JButton stop = new homeButton("Back to Home");
		stop.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if(vs.isPlay()) {
					vs.stopPlay();
				}
				j4.dispose();
				ApplicationDriver a = new ApplicationDriver();
				a.mainMenu(a);
			}
		});
		j4.getContentPane().add(stop);
		
		JButton gallery = new nextButton("3D Gallery");
	    gallery.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if(vs.isPlay()) {
					vs.stopPlay();
				}
				j4.dispose();
				new Instruction();
			}
		});
	    j4.getContentPane().add(gallery);
	    gallery.setVisible(false);
	    
	    Timer timer6 = new Timer(3000, new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				gallery.setVisible(true);
			}
		});
	    
		JButton nc = new nextButton("Next");
		nc.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				timer.start();
				timer1.start();
				timer2.start();
				vs7.setVisible(false);
				timer3.start();
				timer4.start();
				timer5.start();
				timer6.start();
			}
		});
		j4.getContentPane().add(nc);
		}	

}
