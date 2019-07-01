import { Buffer2D } from "./Buffer2D";
import { LayaGL } from "../../layagl/LayaGL"
	import { WebGLContext } from "../WebGLContext"
import { Buffer } from "./Buffer";

	export class IndexBuffer2D extends Buffer2D {
		 static create:Function = function(bufferUsage:number = 0x88e4/* WebGLContext.STATIC_DRAW*/):IndexBuffer2D {
			return new IndexBuffer2D(bufferUsage);
		}
		
		protected _uint16Array:Uint16Array;
		
		constructor(bufferUsage:number = 0x88e4/* WebGLContext.STATIC_DRAW*/){
			super();
			this._bufferUsage = bufferUsage;
			this._bufferType = WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER;
			this._buffer = new ArrayBuffer(8);
		}
		
		/*override*/ protected _checkArrayUse():void {
			this._uint16Array && (this._uint16Array = new Uint16Array(this._buffer));
		}
		
		 getUint16Array():Uint16Array {
			return this._uint16Array || (this._uint16Array = new Uint16Array(this._buffer));
		}
		
		/**
		 * @inheritDoc
		 */
		/*override*/  _bindForVAO():void {
			LayaGL.instance.bindBuffer(WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER, this._glBuffer);
		}
		
		/**
		 * @inheritDoc
		 */
		/*override*/  bind():boolean {
			if (Buffer._bindedIndexBuffer !== this._glBuffer) {
				LayaGL.instance.bindBuffer(WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER, this._glBuffer);
				Buffer._bindedIndexBuffer = this._glBuffer;
				return true;
			}
			return false;
		}
		
		 destory():void {
			this._uint16Array = null;
			this._buffer = null;
		}
		
		 disposeResource():void {
			this._disposeResource();
		}
	}
