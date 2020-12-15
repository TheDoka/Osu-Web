class HitObject
{
    
    /* 
     x (Integer) and y (Integer):           Position in osu! pixels of the object.
     time (Integer):                        Time when the object is to be hit, in milliseconds from the beginning of the beatmap's audio.
     type (Integer):                        Bit flags indicating the type of the object. See the type section.
     hitSound (Integer):                    Bit flags indicating the hitsound applied to the object. See the hitsounds section.
     objectParams (Comma-separated list):   Extra parameters specific to the object's type.
     hitSample (Colon-separated list):      Information about which samples are played when the object is hit. It is closely related to hitSound; see the hitsounds section. If it is not written, it defaults to 0:0:0:0:.
    */
    constructor(x, y, time, type, hitSound, objectParams, hitSample)
    {
        this.x              = x;
        this.y              = y;
        this.time           = time
        this.type           = new ObjetType(type);
        this.hitSound       = new Hitsounds(hitSound);
        this.objectParams   = objectParams
        this.hitSample      = hitSample

    }

    delete() { }
    render(ctx) {
        
        var CS = 5;
        ctx.arc(this.x, this.y, CS, 0, Math.PI * 2, true);  // Cercle extérieur
        ctx.stroke();

        console.log('draw one circle');

        switch(this.type.type)
        {
            // hit circle
            case 0: 


            break;
        }

    }
    
}


class ObjetType{
    // 0: Hit circle
    // 1: Slider
    // 3: Spinner
    // 7: osu!mania hold
    constructor(type) {
         this.type = type;
    }

}

class Hitsounds{

    // Syntax: normalSet:additionSet:index:volume:filename

    // normalSet (Integer): Sample set of the normal sound.
    // additionSet (Integer): Sample set of the whistle, finish, and clap sounds.
    // index (Integer): Index of the sample. If this is 0, the timing point's sample index will be used instead.
    // volume (Integer): Volume of the sample from 1 to 100. If this is 0, the timing point's volume will be used instead.
    // filename (String): Custom filename of the addition sound.
    // normalSet and additionSet can be any of the following:

    // 0: No custom sample set
    // For normal sounds, the set is determined by the timing point's sample set.
    // For additions, the set is determined by the normal sound's sample set.
    // 1: Normal set
    // 2: Soft set
    // 3: Drum set

    constructor(type) {
         this.type = type;
         
    }

    emerge() {}
}