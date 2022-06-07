import java.io.File;
/**
 * This is the music interface to allow all its subclasses play exactly the same music 
 * without initialize another music clip using default method
 * @author Yangli Liu
 *
 */
public interface setSoundTrack01 {
	music m = new music((new File("DaVinci.wav")));
	default music set() {
		return m;
	}
}
