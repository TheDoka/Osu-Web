class BeatMap
{

    data;

    general;
    editor;
    metadata;
    difficulty;
    events;
    timingPoints;
    colours;
    hitObjects;

    constructor(filename)
    {
        this.filename = filename;
        this.parse();

    }


    getBeatmap()
    {
        return this.data =  $.ajax({
                                    url: this.filename,
                                    async: false
                                }).responseText;
    }

    parse()
    {
        this.getBeatmap();
        // No tag
        this.data = this.data.replace(/([[].*)/gm,"@")
        // Split by tag
        var indexes = this.data.split('@');
        
        const version = indexes[0].trim();
        this.general         = this.parseTag(indexes[1]);
        this.editor          = this.parseTag(indexes[2]);
        this.metadata        = this.parseTag(indexes[3]);
        this.difficulty      = this.parseTag(indexes[4]);
        this.events          = this.parseTag(indexes[5]);
        this.timingPoints    = this.parseTag(indexes[6]);
        this.colours         = this.parseTag(indexes[7]);
        this.hitObjects      = this.parseHitObject(indexes[8]);

    }

    parseTag(tag)
    {
        var content = {};
        var tmp;
        // General
        tag.trim().split('\n').forEach(line => {
            tmp = line.split(':');
            content[tmp[0]] = tmp[1];
        });

        return content;

    }

    parseHitObject(tag)
    {
        var hitObjects = [];
        var tmp;

        // General
        tag.trim().split('\n').forEach(line => {
            tmp = line.split(',');
            // Array of values as:
            // 0: "256"
            // 1: "192"
            // 2: "9130"
            // 3: "1"
            // 4: "0"
            // 5: "0:0:0:0:"
            
            hitObjects.push(new HitObject(tmp[0], tmp[1], tmp[2], tmp[3], tmp[4], tmp[4], tmp[5]));
        });

        return hitObjects;
    }

    getHitObjects()
    {
        return this.hitObjects;
    }

}



class General
{
    // AudioFilename	String	Location of the audio file relative to the current folder	
    // AudioLeadIn	Integer	Milliseconds of silence before the audio starts playing	0
    // AudioHash	String	Deprecated	
    // PreviewTime	Integer	Time in milliseconds when the audio preview should start	-1
    // Countdown	Integer	Speed of the countdown before the first hit object (0 = no countdown, 1 = normal, 2 = half, 3 = double)	1
    // SampleSet	String	Sample set that will be used if timing points do not override it (Normal, Soft, Drum)	Normal
    // StackLeniency	Decimal	Multiplier for the threshold in time where hit objects placed close together stack (0–1)	0.7
    // Mode	Integer	Game mode (0 = osu!, 1 = osu!taiko, 2 = osu!catch, 3 = osu!mania)	0
    // LetterboxInBreaks	0 or 1	Whether or not breaks have a letterboxing effect	0
    // StoryFireInFront	0 or 1	Deprecated	1
    // UseSkinSprites	0 or 1	Whether or not the storyboard can use the user's skin images	0
    // AlwaysShowPlayfield	0 or 1	Deprecated	0
    // OverlayPosition	String	Draw order of hit circle overlays compared to hit numbers (NoChange = use skin setting, Below = draw overlays under numbers, Above = draw overlays on top of numbers)	NoChange
    // SkinPreference	String	Preferred skin to use during gameplay	
    // EpilepsyWarning	0 or 1	Whether or not a warning about flashing colours should be shown at the beginning of the map	0
    // CountdownOffset	Integer	Time in beats that the countdown starts before the first hit object	0
    // SpecialStyle	0 or 1	Whether or not the "N+1" style key layout is used for osu!mania	0
    // WidescreenStoryboard	0 or 1	Whether or not the storyboard allows widescreen viewing	0
    // SamplesMatchPlaybackRate	0 or 1	Whether or not sound samples will change rate when playing with speed-changing mods	0

    constructor(AudioFilename, AudioLeadIn, AudioHash, PreviewTime, Countdown, SampleSet, StackLeniency, 
                Mode, LetterboxInBreaks, StoryFireInFront, UseSkinSprites, AlwaysShowPlayfield,
                OverlayPosition, SkinPreference, EpilepsyWarning, CountdownOffset, SpecialStyle,
                WidescreenStoryboard, SamplesMatchPlaybackRate
                ) {}

}

class Editor
{
    // Bookmarks	Comma-separated list of integers	Time in milliseconds of bookmarks
    // DistanceSpacing	Decimal	Distance snap multiplier
    // BeatDivisor	Decimal	Beat snap divisor
    // GridSize	Integer	Grid size
    // TimelineZoom	Decimal	Scale factor for the object timeline
    
}

class MetaData{
    // Title	String	Romanised song title
    // TitleUnicode	String	Song title
    // Artist	String	Romanised song artist
    // ArtistUnicode	String	Song artist
    // Creator	String	Beatmap creator
    // Version	String	Difficulty name
    // Source	String	Original media the song was produced for
    // Tags	Space-separated list of strings	Search terms
    // BeatmapID	Integer	Beatmap ID
    // BeatmapSetID	Integer	Beatmapset ID
    
}

class Difficulty
{
    // HPDrainRate	Decimal	HP setting (0–10)
    // CircleSize	Decimal	CS setting (0–10)
    // OverallDifficulty	Decimal	OD setting (0–10)
    // ApproachRate	Decimal	AR setting (0–10)
    // SliderMultiplier	Decimal	Base slider velocity in hecto-osu! pixels per beat
    // SliderTickRate	Decimal	Amount of slider ticks per beat
    
}

class Events
{
    // Event syntax: eventType,startTime,eventParams

    // eventType (String or Integer): Type of the event. Some events may be referred to by either a name or a number.
    // startTime (Integer): Start time of the event, in milliseconds from the beginning of the beatmap's audio. For events that do not use a start time, the default is 0.
    // eventParams (Comma-separated list): Extra parameters specific to the event's type.
    
}

class TimingsPoints 
{
    // Each timing point influences a specified portion of the map, commonly called a "timing section". The .osu file format requires these to be sorted in chronological order.

    // Timing point syntax: time,beatLength,meter,sampleSet,sampleIndex,volume,uninherited,effects

    // time (Integer): Start time of the timing section, in milliseconds from the beginning of the beatmap's audio. The end of the timing section is the next timing point's time (or never, if this is the last timing point).
    // beatLength (Decimal): This property has two meanings:
    // For uninherited timing points, the duration of a beat, in milliseconds.
    // For inherited timing points, a negative inverse slider velocity multiplier, as a percentage. For example, -50 would make all sliders in this timing section twice as fast as SliderMultiplier.
    // meter (Integer): Amount of beats in a measure. Inherited timing points ignore this property.
    // sampleSet (Integer): Default sample set for hit objects (0 = beatmap default, 1 = normal, 2 = soft, 3 = drum).
    // sampleIndex (Integer): Custom sample index for hit objects. 0 indicates osu!'s default hitsounds.
    // volume (Integer): Volume percentage for hit objects.
    // uninherited (0 or 1): Whether or not the timing point is uninherited.
    // effects (Integer): Bit flags that give the timing point extra effects. See the effects section.

}

class Colours
{
    
    // Combo#, where # is an integer	Additive combo colours
    // SliderTrackOverride	Additive slider track colour
    // SliderBorder	Slider border colour

}
