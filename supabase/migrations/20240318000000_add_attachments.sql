-- Add attachments support to chat_messages
ALTER TABLE chat_messages
ADD COLUMN attachments jsonb;

-- Create storage bucket for chat attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('chat-attachments', 'chat-attachments', true);

-- Allow public access to chat attachments
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'chat-attachments');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'chat-attachments'
  AND auth.role() = 'authenticated'
); 