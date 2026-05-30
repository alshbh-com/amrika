CREATE OR REPLACE FUNCTION public.generate_order_barcode()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.barcode IS NULL OR NEW.barcode = '' THEN
    NEW.barcode := nextval('public.order_barcode_seq')::TEXT;
  END IF;
  IF NEW.tracking_id IS NULL OR NEW.tracking_id = '' THEN
    NEW.tracking_id := 'AE-' || NEW.barcode;
  END IF;
  RETURN NEW;
END;
$function$;