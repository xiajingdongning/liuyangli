import java.io.File;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
/**
 * This is the music class for playing music or stop music playing
 * @author Yangli Liu
 *
 */
public class music {
	private Clip clip;
	private File audio;
	private boolean play;
	
	public music(File audio) {
		this.audio = audio;
		this.play = false;
	}
	public void displayMusic (){
		try
	    {
	        clip = AudioSystem.getClip();
	        clip.open(AudioSystem.getAudioInputStream(audio));
	        clip.start();
	        play = true;
	    }
	    catch (Exception exc)
	    {
	        exc.printStackTrace(System.out);
	    }
	}
	
	public void stopPlay() {
		if(clip.isRunning()&&!(clip==null)){
			clip.stop();
			clip.close();
			return;
		}
		else {
			System.out.println("Music ends");
		}
	}
	
	public boolean isPlay() {
		return play;
	}

}
