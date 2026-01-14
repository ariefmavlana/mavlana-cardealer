"use client";

import { MAX_IMAGE_SIZE } from "@/config/constants";
import { endpoints } from "@/config/endpoints";
import { api } from "@/lib/api-client";
import { cn, convertToMb } from "@/lib/utils";
import { ImagePlus, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { type ChangeEvent, type DragEvent, useRef, useState } from "react";

interface ImageUploaderProps {
	onUploadComplete: (url: string) => void;
}

export const ImageUploader = (props: ImageUploaderProps) => {
	const { onUploadComplete } = props;
	const [preview, setPreview] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadComplete, setUploadComplete] = useState(false);
	const [draggingOver, setDraggingOver] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		e.stopPropagation();

		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > MAX_IMAGE_SIZE) {
			setError(`File size exceeds ${convertToMb(file.size)} limit`);
			return;
		}

		setError(null);
		setIsUploading(true);

		const reader = new FileReader();

		reader.onloadend = () => {
			setPreview(reader.result as string);
		};

		reader.readAsDataURL(file);

		try {
			const formData = new FormData();
			formData.append("file", file);
			const response = await api.post<{ url: string }>(
				endpoints.images.singleUpload,
				{
					body: formData,
				},
			);
			const { url } = response;
			onUploadComplete(url);
			setUploadComplete(true);
		} catch (error) {
			console.log("Error uploading file: ", error);
			setError("Failed to upload image. Please try again.");
		} finally {
			setIsUploading(false);
		}
	};

	const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDraggingOver(false);

		const file = e.dataTransfer.files?.[0];
		if (!file) return;
		if (file.size > MAX_IMAGE_SIZE) {
			setError(`File size exceeds ${convertToMb(file.size)} limit`);
			return;
		}

		setError(null);
		setIsUploading(true);

		const reader = new FileReader();

		reader.onloadend = () => {
			setPreview(reader.result as string);
		};

		reader.readAsDataURL(file);

		try {
			const formData = new FormData();
			formData.append("file", file);
			const response = await api.post<{ url: string }>(
				endpoints.images.singleUpload,
				{
					body: formData,
				},
			);

			const { url } = response;

			onUploadComplete(url);
			setUploadComplete(true);
		} catch (error) {
			console.log("Error uploading file: ", error);
			setError("Failed to upload image. Please try again.");
		} finally {
			setIsUploading(false);
		}
	};

	const stopEvent = (e: DragEvent<HTMLInputElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};
	const handleDragEnter = (e: DragEvent<HTMLInputElement>) => {
		stopEvent(e);
	};
	const handleDragLeave = (e: DragEvent<HTMLInputElement>) => {
		stopEvent(e);
		setDraggingOver(false);
	};
	const handleDragOver = (e: DragEvent<HTMLInputElement>) => {
		stopEvent(e);
		setDraggingOver(true);
	};

	const handleClick = () => {
		inputRef.current?.click();
	};

	return (
		<div className="w-full mx-auto">
			<div
				onDrop={handleDrop}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onClick={handleClick}
				onKeyDown={() => null}
				className={cn(
					"relative flex aspect-3/2 cursor-pointer flex-col items-center justify-center rounded-xl transition-all duration-200",
					error ? "border-red-500/50 border-2 border-dotted bg-red-500/5" : "hover:bg-white/5",
					isUploading && "pointer-events-none opacity-50",
					draggingOver ? "bg-primary/10 border-primary/50" : "",
					!uploadComplete && "border-2 border-dashed border-white/20 hover:border-primary/50",
					"bg-black/20"
				)}
			>
				<input
					ref={inputRef}
					type="file"
					accept="image/*"
					onChange={handleUpload}
					className="hidden"
					disabled={isUploading}
					multiple={false}
				/>
				{preview ? (
					<img
						src={preview}
						alt="Preview"
						className="h-full w-full object-cover rounded-xl"
						onError={(e) => {
							e.currentTarget.src = "https://placehold.co/600x400/000000/FFF?text=Image+Load+Error";
							toast({
								title: "Image Error",
								description: "Failed to load image. Please check your internet connection or S3 configuration.",
								variant: "destructive",
							});
						}}
					/>
				) : (
					<div className="text-center flex items-center justify-center flex-col p-4">
						<div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10 group-hover:border-primary/30 transition-colors">
							<ImagePlus className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" />
						</div>
						<p className="mt-1 text-sm text-gray-400 font-medium">
							Click or drag to upload image
						</p>
						<p className="text-xs text-gray-600 mt-1">Maximum file size 2MB</p>
					</div>
				)}
				{isUploading && (
					<div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-xl z-10">
						<div className="flex flex-col items-center">
							<Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
							<p className="text-xs text-white/80 font-medium tracking-wider uppercase">Processing...</p>
						</div>
					</div>
				)}
			</div>
			{error && <p className="mt-2 text-sm text-red-400 bg-red-500/10 p-2 rounded border border-red-500/20 text-center">{error}</p>}
		</div>
	);
};
