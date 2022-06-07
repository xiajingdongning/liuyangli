import java.awt.Color;
import java.awt.Desktop;
import java.awt.Font;
import java.awt.SystemColor;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.File;
import java.net.URL;

import javax.print.attribute.standard.Media;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JRadioButton;
import javax.swing.JTextPane;
import javax.swing.SwingConstants;
import javax.swing.Timer;


public class Picasso04 extends JFrame implements setSoundTrack05{

	public Picasso04() {
		Initial j4 = new Initial("Pablo Picasso");
		music vs = this.set();
		
		JLabel vs10 = new image(20, 0, 400, 532,"/05_10.png");
		j4.getContentPane().add(vs10);
		vs10.setVisible(true);
		
		JLabel vs11 = new image(577, 20, 378, 301,"/05_11.png");
		j4.getContentPane().add(vs11);
		vs11.setVisible(true);
		
		JLabel vs12 = new image(1070, 0, 400, 534,"/05_12.png");
		j4.getContentPane().add(vs12);
		vs12.setVisible(true);
		
		JTextPane txt9 = new text01(20, 530, 500, 185,"Neoclassicism and surrealism(1919–1929). "
				+ "In the period following the upheaval of World War I, Picasso produced work in a neoclassical style. "
				+ "Picasso's paintings and drawings from this period frequently recall the work of Raphael and Ingres. "
				+ "In 1925 the Surrealist writer and poet André Breton declared Picasso as 'one of ours' in his article. He did at the time develop new imagery and formal syntax for expressing himself emotionally, "
				+ "\"releasing the violence, the psychic fears and the eroticism that had been largely contained or sublimated since 1909\", "
				+ "writes art historian Melissa McQuillan. "
				+ "Surrealism revived Picasso's attraction to primitivism and eroticism.",2,15);
		j4.getContentPane().add(txt9);
		txt9.setVisible(true);
		
		JTextPane txt10 = new text01(555, 335, 420, 260,"The Great Depression to World War II and late 1940s (1930–1949) "
				+ "During the 1930s, the minotaur replaced the harlequin as a common motif in his work. "
				+ "Arguably Picasso's most famous work is his depiction of the German bombing of Guernica during the Spanish Civil War – Guernica. "
				+ "This large canvas embodies for many the inhumanity, brutality and hopelessness of war. "
				+ "In 1939 and 1940, the Museum of Modern Art in New York City, under its director Alfred Barr, "
				+ "a Picasso enthusiast, held a major retrospective of Picasso's principal works until that time."
				+ "During the Second World War, Picasso remained in Paris while the Germans occupied the city. "
				+ "He continued to paint, producing works such as the Still Life with Guitar (1942) and The Charnel House (1944–48).",2,15);
		j4.getContentPane().add(txt10);
		txt10.setVisible(true);
		
		JTextPane txt11 = new text01(1020, 540, 450, 165,"In the 1950s, Picasso's style changed once again, "
				+ "as he took to producing reinterpretations of the art of the great masters. "
				+ "In addition to his artistic accomplishments, Picasso made a few film appearances. "
				+ "He was commissioned to make a maquette for a huge 50-foot (15 m)-high public sculpture to be built in Chicago, "
				+ "known usually as the Chicago Picasso. Pablo Picasso died on 8 April 1973 in Mougins, France, "
				+ "from pulmonary edema and heart failure, while he and his second wife Jacqueline entertained friends for dinner.",2,15);
		j4.getContentPane().add(txt11);
		txt11.setVisible(true);
		
		JRadioButton watch = new JRadioButton("Go to watch extra video");
		watch.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if(vs.isPlay()) {
					vs.stopPlay();
				}
				try {
					Desktop.getDesktop().browse(new URL("https://www.youtube.com/embed/Nxes8pyHkJc").toURI());
				}
				catch(Exception E){
					System.out.println("Error occur.");
				}
				
			}
		});
		watch.setHorizontalAlignment(SwingConstants.CENTER);
		watch.setBackground(Color.WHITE);
		watch.setForeground(Color.BLACK);
		watch.setFont(new Font("Georgia", Font.BOLD | Font.ITALIC, 15));
		watch.setEnabled(false);
		watch.setBounds(645, 620, 220, 35);
		j4.getContentPane().add(watch);
		
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
	    gallery.setVisible(true);
	}
	
	

}
