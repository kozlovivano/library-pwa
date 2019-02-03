import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../service/global.service';
import { ApiService } from '../../service/api.service';
import Quagga from 'quagga';
import { Router, ActivatedRoute } from '@angular/router';
import ISBN from 'isbn-validate';
@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss']
})
export class BarcodeScannerComponent implements OnInit {

  isbn;
  isScan = false;
  constructor(
    private global: GlobalService,
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.global.subtitle = 'ISBN scanning...';
    this.startScan();
  }

  startScan() {
    this.isScan = true;
    var _this = this;
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#preview'),    // Or '#yourElement' (optional)
        constraints: {
          width: document.getElementById('preview').offsetWidth,
          height: 220,
          facingMode: "environment"
        },
        area: { 
          top: "0%",   
          right: "0%", 
          left: "0%",  
          bottom: "0%" 
        },
      },
      decoder: {
        readers: [
          "code_128_reader",
          "ean_reader",
          "ean_8_reader",
          "code_39_reader",
          "code_39_vin_reader",
          "codabar_reader",
          "upc_reader",
          "upc_e_reader",
          "i2of5_reader"
        ],
        debug: {
          showCanvas: true,
          showPatches: true,
          showFoundPatches: true,
          showSkeleton: true,
          showLabels: true,
          showPatchLabels: true,
          showRemainingPatchLabels: true,
          boxFromPatches: {
            showTransformed: true,
            showTransformedBox: true,
            showBB: true
          }
        }
      }
    }, function (err) {
      if (err) {
        console.log(err);
        return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();

    });
    Quagga.onProcessed(function (result) {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
          result.boxes.filter(function (box) {
            return box !== result.box;
          }).forEach(function (box) {
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
          });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
        }
      }
    });
    Quagga.onDetected(function (result) {
      var code = result.codeResult.code;
      var len = code.toString().length;
      // if((len == 10 || len == 13) && ISBN.validate(code)){
      if (len == 10 || len == 13) {
        console.log('valid ISBN detected: ' + code);
        _this.global.isbn = code;
        _this.router.navigate(['book-information']);
        Quagga.stop();
      }
    });
  }

  stopScan(){
    this.isScan = false;
    Quagga.stop();
    this.global.onBack();
  }
}
