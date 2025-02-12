let debut = 0
let boolBegin = false
let timeStart = 0
basic.forever(function on_forever() {
    let elapsedTime: number;
    
    let debut = pins.digitalReadPin(DigitalPin.P0)
    if (debut != 0 && !boolBegin) {
        timeStart = control.millis()
        boolBegin = true
        basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    }
    
    if (boolBegin) {
        elapsedTime = control.millis() - timeStart
        if (85000 <= elapsedTime && elapsedTime <= 100000) {
            if (maqueen.Ultrasonic() >= 5) {
                //  Continue à avancer si pas d'obstacle
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 200)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 200)
            } else {
                //  Arrête le robot s'il y a un obstacle
                maqueen.motorStop(maqueen.Motors.All)
            }
            
        } else if (elapsedTime > 100000) {
            //  Arrêt définitif après 100 secondes
            maqueen.motorStop(maqueen.Motors.All)
            boolBegin = false
            basic.showLeds(`
            . . . . .
            . . . . .
            . # # # .
            . . . . .
            . . . . .
            `)
        }
        
    }
    
})
