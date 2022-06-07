import java.io.File;
public interface setSoundTrack03 {
	music m = new music((new File("VanGogh.wav")));
	default music set() {
		return m;
	}

}
