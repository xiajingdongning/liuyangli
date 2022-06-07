import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextPane;

public class Rembrandt03 extends JFrame implements setSoundTrack02{
	public Rembrandt03() {
		Initial j3 = new Initial("Rembrandt Harmenszoon van Rijn");
		music vs = this.set();
		
		JLabel vs7 = new image(25, 20, 678, 568,"/02_07.png");
		j3.getContentPane().add(vs7);
		vs7.setVisible(true);
		
		JLabel vs8 = new image(725, 60, 307, 400,"/02_08.png");
		j3.getContentPane().add(vs8);
		vs8.setVisible(true);
		
		JLabel vs9 = new image(1058, 110, 400, 285,"/02_09.png");
		j3.getContentPane().add(vs9);
		vs9.setVisible(true);
		
		JTextPane txt6 = new text01(25, 590, 678, 80,"Militia Company of District II under the Command of Captain Frans Banninck Cocq, "
				+ "also known as The Shooting Company of Frans Banning Cocq and Willem van Ruytenburch, but commonly referred to as "
				+ "The Night Watch, is a 1642 painting by Rembrandt van Rijn."
				+ "The Night Watch is one of the most famous Dutch Golden Age paintings.",1,16);
		j3.getContentPane().add(txt6);
		txt6.setVisible(true);
		
		JTextPane txt7 = new text01(725, 477, 307, 190,"Because of his empathy for the human condition, he has been called "
				+ "\"one of the great prophets of civilization\".The French sculptor Auguste Rodin said, \"Compare me with Rembrandt! "
				+ "What sacrilege! With Rembrandt, the colossus of Art! We should prostrate ourselves before Rembrandt and "
				+ "never compare anyone with him!\"",2,17);
		j3.getContentPane().add(txt7);
		txt7.setVisible(true);
		
		JTextPane txt8 = new text01(1058, 415, 400, 250,"The Rest on the Flight into Egypt is a subject in Christian art showing Mary, "
				+ "Joseph, and the infant Jesus resting during their flight into Egypt. The Holy Family is normally shown in a landscape."
				+ "\n\nIn a night scene by Rembrandt (1647, Dublin), "
				+ "the family seem to have joined some herdsmen with a big fire for the night; this is his only night landscape."
				+ "This relates to the painting of the Flight by Adam Elsheimer where they are just arriving at such an improvised encampment; "
				+ "Rembrandt would have known this from a print.",1,17);
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
				new Rembrandt04();
			}
		});
		j3.getContentPane().add(nc);
	}

}
