package api;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import generated.tables.records.ReceiptRecord;
import generated.tables.records.TagRecord;

import static generated.Tables.*;

import java.math.BigDecimal;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import org.jooq.Record;

/**
 * This is an API Object.  Its purpose is to model the JSON API that we expose.
 * This class is NOT used for storing in the Database.
 *
 * This ReceiptResponse in particular is the model of a Receipt that we expose to users of our API
 *
 * Any properties that you want exposed when this class is translated to JSON must be
 * annotated with {@link JsonProperty}
 */
public class ReceiptWithTags {
  @JsonProperty
  Integer id;

  @JsonProperty
  String merchantName;

  @JsonProperty
  BigDecimal value;

  @JsonProperty
  Time created;

  @JsonProperty
  List<String> tags = new ArrayList<String>();

  public ReceiptWithTags(ReceiptResponse response, List<String> tags) {
    this.merchantName = response.merchantName;
    this.value = response.value;
    this.created = response.created;
    this.id = response.id;
    this.tags = tags;
  }
}
